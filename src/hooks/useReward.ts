import BigNumber from "bignumber.js";
import useSWR from "swr";
import { REFRESH_INTERVAL } from "../constants";
import { rewardContract } from "../contracts/contracts";
import { Reward } from "../types/types";
import { useWallet } from "./useWallet";

async function fetchReward(address: string): Promise<Reward> {
  const res = await rewardContract.methods.userInfo(address).call();

  return {
    claimedKlay: new BigNumber(res.claimedKlay),
    vestedKlay: new BigNumber(res.vestedKlay),
    claimedToken: new BigNumber(res.claimedToken),
    vestedToken: new BigNumber(res.vestedToken),
  };
}

export function useReward() {
  const { wallet } = useWallet();
  const { data, mutate } = useSWR(
    "reward",
    () => wallet && fetchReward(wallet.address),
    { refreshInterval: REFRESH_INTERVAL.default }
  );

  return { data, mutate };
}
