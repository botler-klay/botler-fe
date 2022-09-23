import { css } from "@emotion/css";
import { useWallet } from "../../hooks/useWallet";
import { Column, Row } from "../Layouts";

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
      <h2
        className={css`
          color: #d8d8d8;
          font-size: 20px;
          line-height: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        `}
      >
        Connect Wallet
      </h2>
      <span
        className={css`
          font-size: 13px;
          line-height: 13px;
          color: #d8d8d8;
          margin-bottom: 36px;
        `}
      >
        You should use Klaytn Cypress Mainnet to connect your wallet.
      </span>
      <button onClick={handleConnect}>
        <Row
          className={css`
            background: linear-gradient(
              262.32deg,
              #2867ee 5.28%,
              #1e5ed5 89.86%
            );
            padding: 16px 0;

            justify-content: center;
            align-items: center;
            gap: 8px;
          `}
        >
          <img
            src="/assets/images/kaikas.svg"
            alt=""
            className={css`
              width: 24px;
            `}
          />
          <span
            className={css`
              font-size: 16px;
              line-height: 16px;
              color: #d8d8d8;
            `}
          >
            Kaikas
          </span>
        </Row>
      </button>
      <button
        className={css`
          padding-top: 24px;
          font-size: 16px;
          line-height: 16px;
          color: #d8d8d8;
        `}
        onClick={close}
      >
        Close
      </button>
    </Column>
  );
}
