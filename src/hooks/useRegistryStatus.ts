import BigNumber from "bignumber.js";
import useSWR from "swr";
import { REFRESH_INTERVAL } from "../constants";
import { registryContract } from "../contracts/contracts";
import { RegistryStatus } from "../types/types";

async function fetchRegistryStatus(): Promise<RegistryStatus> {
  const res = await registryContract.methods.registryStatus().call();

  return {
    ...res,
    minimumBotlerFee: new BigNumber(res.minimumBotlerFee),
    registrationFee: new BigNumber(res.registrationFee),
    executionFee: new BigNumber(res.executionFee),
    adminFee: new BigNumber(res.adminFee),
    accumulatedAdminFee: new BigNumber(res.accumulatedAdminFee),
  };
}

export function useRegistryStatus() {
  const { data, mutate } = useSWR("registryStatus", fetchRegistryStatus, {
    refreshInterval: REFRESH_INTERVAL.registryStatus,
  });

  return { data, mutate };
}
