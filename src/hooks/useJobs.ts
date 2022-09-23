import BigNumber from "bignumber.js";
import useSWR from "swr";
import { Job } from "../types/types";

async function fetchJobs(): Promise<Job[]> {
  return [
    {
      jid: "1",
      name: "ABC",
      address: "0x123",
      feePerCall: new BigNumber("11110000000000000000"),
      accumFee: new BigNumber("222220000000000000000"),
      balance: new BigNumber("44550000000000000000"),
      status: "Active",
      owner: "0x373e13B3B55D86B48cf6A5F3464942140f1E1486",
      description:
        "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
      numOfRuns: 3,
    },
    {
      jid: "2",
      name: "DEF",
      address: "0x456",
      feePerCall: new BigNumber("3330000000000000000"),
      accumFee: new BigNumber("555550000000000000000"),
      balance: new BigNumber("24420000000000000000"),
      status: "InActive",
      owner: "0xabcdef",
      description:
        "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
      numOfRuns: 3,
    },
    {
      jid: "3",
      name: "GEH",
      address: "0x789",
      feePerCall: new BigNumber("2250000000000000000"),
      accumFee: new BigNumber("314150000000000000000"),
      balance: new BigNumber("1212210000000000000000"),
      status: "InActive",
      owner: "0x373e13B3B55D86B48cf6A5F3464942140f1E1486",
      description:
        "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
      numOfRuns: 3,
    },
    {
      jid: "4",
      name: "IJK",
      address: "0xABC",
      feePerCall: new BigNumber("81910000000000000000"),
      accumFee: new BigNumber("9265358979320000000000000000"),
      balance: new BigNumber("48493110000000000000000"),
      status: "Active",
      owner: "0x098098089",
      description:
        "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello",
      numOfRuns: 3,
    },
  ];
}

export function useJobs() {
  const { data } = useSWR("jobs", fetchJobs);

  const getJobDetail = (jid?: string) => {
    if (!data || !jid) return undefined;

    return data.find((job) => job.jid === jid);
  };

  return { data, getJobDetail };
}
