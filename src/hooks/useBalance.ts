import BigNumber from "bignumber.js";
import useSWR from "swr";
import { caver } from "../contracts/contracts";
import { useWallet } from "./useWallet";

async function fetchBalance(account: string) {
  const balance = await caver.klay.getBalance(account);

  return balance;
}

export function useBalance() {
  const { wallet } = useWallet();

  const { data } = useSWR(
    ["/balance", wallet?.address],
    () => wallet && fetchBalance(wallet.address),
    {
      refreshInterval: 5000,
    }
  );

  return new BigNumber(data || 0);
}
