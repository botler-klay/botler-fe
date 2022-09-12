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
      // Handle error. Likely the user rejected the login
      console.error(error);
    }
  };

  return {
    wallet,
    connect,
  };
}
