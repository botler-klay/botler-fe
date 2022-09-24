import { css } from "@emotion/css";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BAOBAB_NETWORK_VERSION } from "../constants";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";
import { Row } from "./Layouts";
import { Modal } from "./Modal";
import { WalletModalContent } from "./ModalContents/WalletModalContent";
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { wallet, disconnect } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const walletBtnText = useMemo(() => {
    if (!wallet) {
      return "Connect Wallet";
    }

    if (wallet.networkVersion !== BAOBAB_NETWORK_VERSION) {
      return "Invalid Network";
    }

    return "Disconnect";
  }, [wallet]);

  return (
    <Row
      style={{
        padding: "24px 64px",
        justifyContent: "space-between",
        marginBottom: 32,
      }}
    >
      <Row style={{ gap: 40, width: "fit-content", alignItems: "center" }}>
        <img
          src="/assets/images/logo.svg"
          alt="Botler"
          style={{ width: 100, height: 20 }}
        />
        <Row style={{ gap: 36, width: "fit-content", fontSize: 14 }}>
          <button
            style={{
              color: location.pathname.includes(routes.jobs)
                ? "#1564ff"
                : "#a7a7a7",
            }}
            onClick={() =>
              location.pathname !== routes.jobs && navigate(routes.jobs)
            }
          >
            Jobs
          </button>
          <button
            style={{
              color:
                location.pathname === routes.rewards ? "#1564ff" : "#a7a7a7",
            }}
            onClick={() =>
              location.pathname !== routes.rewards && navigate(routes.rewards)
            }
          >
            Rewards
          </button>
        </Row>
      </Row>
      <Row style={{ width: "fit-content", gap: 24, alignItems: "center" }}>
        {wallet && (
          <button
            className={css`
              color: white;
              font-size: 14px;
              line-height: 14px;
              border-bottom: 1px solid white;
              height: fit-content;
            `}
          >
            {wallet.address.substring(0, 6)}...
            {wallet.address.substring(
              wallet.address.length - 4,
              wallet.address.length
            )}
          </button>
        )}
        <button
          className={css`
            background: #282a34;
            border-radius: 10px;
            color: #d8d8d8;
            padding: 8px 18px;
          `}
          onClick={wallet ? disconnect : () => setIsOpen(true)}
        >
          {walletBtnText}
        </button>
      </Row>
      <Modal isOpen={isOpen}>
        <WalletModalContent close={() => setIsOpen(false)} />
      </Modal>
    </Row>
  );
}
