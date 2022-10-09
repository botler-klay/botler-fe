import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { BAOBAB_NETWORK_VERSION } from "../constants";
import { walletAtom } from "../recoil/atoms";
import { getKaikasProvider } from "../utils/kaikas";

export function useWallet() {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  const connect = async () => {
    const provider = getKaikasProvider();

    if (!provider) return false;

    try {
      const accounts = await provider.enable();

      setWallet({
        address: accounts[0],
        networkVersion: provider.networkVersion,
        isValid: provider.networkVersion === BAOBAB_NETWORK_VERSION,
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
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
    if (!wallet || !wallet.isValid) return;

    const provider = getKaikasProvider();

    if (!provider) return;

    provider.on("accountsChanged", (accounts: string[]) => {
      setWallet((prev) => prev && { ...prev, address: accounts[0] });
    });

    provider.on("networkChanged", (networkVersion: number) => {
      setWallet((prev) => prev && { ...prev, networkVersion });
    });
  }, [setWallet, wallet]);

  useEffect(() => {
    if (!wallet || !wallet.isValid) return;

    setWallet(
      (prev) =>
        prev && {
          ...prev,
          isValid: wallet.networkVersion === BAOBAB_NETWORK_VERSION,
        }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.networkVersion]);
}
