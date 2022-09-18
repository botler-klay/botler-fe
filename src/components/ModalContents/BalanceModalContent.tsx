import { ChangeEvent, useState } from "react";
import { Button } from "../Button";
import { Column, Row } from "../Layouts";

export function BalanceModalContent({
  close,
  balance,
}: {
  close: () => void;
  balance: string;
}) {
  const [isAdd, setIsAdd] = useState(true);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const strVal = e.target.value;

    if (!strVal) {
      setAmount(undefined);

      return;
    }

    const numVal = Number(strVal);

    if (!isNaN(numVal)) {
      if (!isAdd) {
        if (numVal > Number(balance)) {
          setAmount(Number(balance));

          return;
        }
      }

      if (numVal > 10000) {
        setAmount(10000);

        return;
      }

      setAmount(numVal);
    }
  };

  const onConfirm = () => {};

  const resultBalance =
    Number(balance) + (amount ? (isAdd ? 1 : -1) * amount : 0);

  return (
    <Column style={{ width: "fit-content", gap: 24 }}>
      <Row style={{ justifyContent: "center" }}>
        <button
          onClick={() => setIsAdd(true)}
          style={{
            fontWeight: isAdd ? "bold" : "normal",
            padding: 4,
            borderBottom: isAdd ? "2.5px solid black" : "1px solid black",
            width: 156,
          }}
        >
          Add
        </button>
        <button
          onClick={() => setIsAdd(false)}
          style={{
            fontWeight: isAdd ? "normal" : "bold",
            padding: 4,
            borderBottom: isAdd ? "1px solid black" : "2.5px solid black",
            width: 156,
          }}
        >
          Withdraw
        </button>
      </Row>
      <Column style={{ gap: 16 }}>
        <Row style={{ width: 490, justifyContent: "space-between" }}>
          <span>Wallet Balance</span>
          <span>10000 KLAY</span>
        </Row>
        <Row style={{ width: 490, justifyContent: "space-between" }}>
          <span>Job Balance</span>
          <span>{balance} KLAY</span>
        </Row>
        <input
          onChange={handleChangeAmount}
          value={amount}
          type="number"
          style={{ textAlign: "right" }}
        />
        <Row style={{ width: 490, justifyContent: "flex-end" }}>
          {resultBalance} KLAY
        </Row>
      </Column>
      <Row style={{ justifyContent: "flex-end", gap: 8 }}>
        <button onClick={close}>Cancel</button>
        <Button onClick={onConfirm}>
          {isAdd ? "Add" : "Withdraw"} Balance
        </Button>
      </Row>
    </Column>
  );
}
