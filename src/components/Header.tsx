import { useMemo, useState } from "react";
import ReactModal from "react-modal";
import { CYPRESS_NETWORK_VERSION } from "../constants";
import { useWallet } from "../hooks/useWallet";
import { Button } from "./Button";
import { Row } from "./Layouts";
import { WalletModalContent } from "./ModalContents/WalletModalContent";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { wallet, disconnect } = useWallet();

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
    <Row
      style={{
        padding: "12px 16px",
        justifyContent: "space-between",
      }}
    >
      <span>Botler</span>
      <Button onClick={wallet ? disconnect : () => setIsOpen(true)}>
        {walletBtnText}
      </Button>
      <ReactModal
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            left: "50%",
            transform: "translate(-50%, 0)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
        isOpen={isOpen}
      >
        <WalletModalContent close={() => setIsOpen(false)} />
      </ReactModal>
    </Row>
  );
}
