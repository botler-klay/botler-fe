import { useWallet } from "../hooks/useWallet";

export function Header() {
  const { wallet, connect } = useWallet();

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
      <button onClick={connect}>
        {wallet ? wallet.address : "Connect Wallet"}
      </button>
    </div>
  );
}
