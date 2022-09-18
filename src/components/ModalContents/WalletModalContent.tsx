import { useWallet } from "../../hooks/useWallet";
import { Button } from "../Button";
import { Column } from "../Layouts";

export function WalletModalContent({ close }: { close: () => void }) {
  const { connect } = useWallet();

  const handleConnect = async () => {
    const isConnected = await connect();
    if (isConnected) {
      close();
    }
  };

  return (
    <Column style={{ width: "fit-content" }}>
      <h2>Connect Wallet</h2>
      <span>You should use Klaytn Cypress Mainnet to connect your wallet.</span>
      <Button onClick={handleConnect}>Kaikas</Button>
      <button onClick={close}>Close</button>
    </Column>
  );
}
