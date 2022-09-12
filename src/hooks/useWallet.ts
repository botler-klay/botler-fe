import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { walletAtom } from "../recoil/atoms";
import { getKaikasProvider } from "../utils/kaikas";

export function useWallet() {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  const connect = async () => {
    const provider = getKaikasProvider();

    if (!provider) return;

    try {
      const accounts = await provider.enable();

      setWallet({
        address: accounts[0],
        networkVersion: provider.networkVersion,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const disconnect = () => {
    setWallet(undefined);
  };

  return {
    wallet,
    connect,
    disconnect,
  };
}

export function useWalletEvent() {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  useEffect(() => {
    if (!wallet) return;

    const provider = getKaikasProvider();

    if (!provider) return;

    provider.on("accountsChanged", (accounts: string[]) => {
      setWallet((prev) => prev && { ...prev, address: accounts[0] });
    });

    provider.on("networkChanged", (networkVersion: number) => {
      setWallet((prev) => prev && { ...prev, networkVersion });
    });
  }, [setWallet, wallet]);
}
