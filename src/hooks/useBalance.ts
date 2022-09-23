import BigNumber from "bignumber.js";
import Caver from "caver-js";
import useSWR from "swr";
import { useWallet } from "./useWallet";

const caver = new Caver(window.klaytn);

async function fetchBalance(account: string) {
  const balance = await caver.klay.getBalance(account);

  console.log(caver, account, balance);

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
