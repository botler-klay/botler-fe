import { css } from "@emotion/css";
import BigNumber from "bignumber.js";
import { ChangeEvent, useState } from "react";
import { GAS_LIMIT } from "../../constants";
import { registryContract } from "../../contracts/contracts";
import { useBalance } from "../../hooks/useBalance";
import { useWallet } from "../../hooks/useWallet";
import { formatTokenAmount } from "../../utils/bignumber";
import { PrimaryButton } from "../Button";
import { Column, Row } from "../Layouts";

const boxCSS = css`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #818181;
  padding: 16px;
  gap: 12px;
`;

export function BalanceModalContent({
  close,
  balance,
  jobAddress,
}: {
  close: () => void;
  balance: BigNumber;
  jobAddress: string;
}) {
  const { wallet } = useWallet();
  const walletBalance = useBalance();
  const [isAdd, setIsAdd] = useState(true);
  const [amountStr, setAmountStr] = useState("");
  const amount = new BigNumber(amountStr || 0).times(new BigNumber(10).pow(18));

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const strVal = e.target.value;

    if (!strVal) {
      setAmountStr("");

      return;
    }

    const bigNumVal = new BigNumber(strVal).times(new BigNumber(10).pow(18));

    if (!bigNumVal.isNaN()) {
      if (!isAdd) {
        if (bigNumVal.gt(balance)) {
          setAmountStr(formatTokenAmount(balance));

          return;
        }
      }

      if (bigNumVal.gt(walletBalance)) {
        setAmountStr(formatTokenAmount(walletBalance));

        return;
      }

      if (bigNumVal.lte(0)) {
        setAmountStr("0");

        return;
      }

      setAmountStr(strVal);
    }
  };

  const onConfirm = async () => {
    if (!wallet || !wallet.isValid) {
      close();
      return;
    }

    if (isAdd) {
      try {
        const receipt = await registryContract.methods
          .deposit(jobAddress)
          .send({
            from: wallet.address,
            value: amount.toString(),
            gas: GAS_LIMIT.default,
          });

        console.log(receipt);
      } catch (e) {
        console.error(e);
      }

      close();
      return;
    }

    try {
      const receipt = await registryContract.methods
        .withdraw(jobAddress, amount.toString())
        .send({ from: wallet.address, gas: GAS_LIMIT.default });

      console.log(receipt);
    } catch (e) {
      console.error(e);
    }

    close();
  };

  const resultBalance = balance.plus(amount ? amount.times(isAdd ? 1 : -1) : 0);

  return (
    <Column
      style={{
        width: "fit-content",
        gap: 24,
        color: "white",
        fontSize: 14,
        lineHeight: "14px",
      }}
    >
      <Row
        style={{
          justifyContent: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => setIsAdd(true)}
          style={{
            fontWeight: isAdd ? 700 : "normal",
            padding: 4,
            borderBottom: isAdd ? "2.5px solid white" : "white",
            width: 80,
            zIndex: 1,
          }}
        >
          Add
        </button>
        <button
          onClick={() => setIsAdd(false)}
          style={{
            fontWeight: isAdd ? "normal" : 700,
            padding: 4,
            borderBottom: isAdd ? "unset" : "2.5px solid white",
            width: 80,
            zIndex: 1,
          }}
        >
          Withdraw
        </button>
        <div
          className={css`
            position: absolute;
            bottom: 0.5px;
            height: 1px;
            width: 160px;
            background-color: white;
            z-index: 0;
          `}
        />
      </Row>
      <Column style={{ gap: 16 }}>
        <Row
          style={{ width: 320, justifyContent: "space-between" }}
          className={boxCSS}
        >
          <span>Wallet Balance</span>
          <span style={{ fontWeight: 700 }}>
            {formatTokenAmount(walletBalance)} KLAY
          </span>
        </Row>
        <Column className={boxCSS}>
          <Row style={{ justifyContent: "flex-start" }}>
            <span>Job Balance</span>
          </Row>
          <Row style={{ justifyContent: "flex-end" }}>
            <span>{formatTokenAmount(balance)} KLAY</span>
          </Row>
          <Row
            style={{
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderBottom: "1px solid white",
            }}
          >
            <span>+</span>
            <Row
              style={{ width: "fit-content" }}
              className={css`
                font-size: 18px;
                line-height: 18px;
                gap: 8px;
              `}
            >
              <input
                placeholder="0"
                onChange={handleChangeAmount}
                value={amountStr}
                type="number"
                className={css`
                  text-align: right;
                  background: transparent;
                  color: white;
                  border: unset;
                `}
              />
              <span>KLAY</span>
            </Row>
          </Row>
          <Row
            className={css`
              justify-content: flex-end;
              font-weight: 700;
            `}
          >
            {formatTokenAmount(resultBalance)} KLAY
          </Row>
        </Column>
      </Column>
      <Row style={{ justifyContent: "flex-end", gap: 8 }}>
        <button
          className={css`
            padding: 12px 20px;
          `}
          onClick={close}
        >
          Cancel
        </button>
        <PrimaryButton onClick={onConfirm}>
          {isAdd ? "Add" : "Withdraw"} Balance
        </PrimaryButton>
      </Row>
    </Column>
  );
}
