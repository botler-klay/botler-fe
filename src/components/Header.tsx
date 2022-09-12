import { useMemo } from "react";
import { CYPRESS_NETWORK_VERSION } from "../constants";
import { useWallet } from "../hooks/useWallet";

export function Header() {
  const { wallet, connect } = useWallet();

  const walletBtnText = useMemo(() => {
    if (!wallet) {
      return "Connect Wallet";
    }

    if (wallet.networkVersion !== CYPRESS_NETWORK_VERSION) {
      return "Invalid Network";
    }

    return wallet.address;
  }, [wallet]);

  return (
    <div
      style={{
        width: "100%",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>Botler</span>
      <button onClick={connect}>{walletBtnText}</button>
    </div>
  );
}
