import BigNumber from "bignumber.js";
import useSWR from "swr";
import { REFRESH_INTERVAL } from "../constants";
import { registryContract } from "../contracts/contracts";
import { Job } from "../types/types";
import { useRegistryStatus } from "./useRegistryStatus";

async function fetchJobs(jobListLength: number): Promise<Job[]> {
  const jobs = [];

  for (let i = 0; i < jobListLength; i += 1) {
    const address = await registryContract.methods.jobList(i).call();
    const info = await registryContract.methods.jobInfo(address).call();
    jobs.push({
      address,
      ...info,
      botlerFee: new BigNumber(info.botlerFee),
      accumulatedFee: new BigNumber(info.accumulatedFee),
      balance: new BigNumber(info.balance),
      jid: i.toString(),
    });
  }

  return jobs;
}

export function useJobs() {
  const { data: registryStatus } = useRegistryStatus();
  const { data, mutate } = useSWR(
    "jobs",
    () => registryStatus && fetchJobs(registryStatus.jobListLength),
    { refreshInterval: REFRESH_INTERVAL.jobs }
  );

  const getJobDetail = (jid?: string) => {
    if (!data || !jid) return undefined;

    return data.find((job) => job.jid === jid);
  };

  return { data, getJobDetail, mutate };
}
