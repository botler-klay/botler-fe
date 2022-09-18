import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CYPRESS_NETWORK_VERSION } from "../constants";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";
import { Button } from "./Button";
import { Row } from "./Layouts";
import { Modal } from "./Modal";
import { WalletModalContent } from "./ModalContents/WalletModalContent";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { wallet, disconnect } = useWallet();
  const navigate = useNavigate();

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
      <Row style={{ gap: 32, width: "fit-content" }}>
        <span style={{ fontSize: 24, fontWeight: "bold" }}>Botler</span>
        <Row style={{ gap: 16, width: "fit-content" }}>
          <button onClick={() => navigate(routes.main)}>Jobs</button>
          <button>Rewards</button>
        </Row>
      </Row>
      <Button onClick={wallet ? disconnect : () => setIsOpen(true)}>
        {walletBtnText}
      </Button>
      <Modal isOpen={isOpen}>
        <WalletModalContent close={() => setIsOpen(false)} />
      </Modal>
    </Row>
  );
}
