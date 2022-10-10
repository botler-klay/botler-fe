import { css } from "@emotion/css";
import BigNumber from "bignumber.js";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { GAS_LIMIT } from "../constants";
import { registryContract } from "../contracts/contracts";
import { useRegistryStatus } from "../hooks/useRegistryStatus";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";
import { formatTokenAmount } from "../utils/bignumber";

const itemTitleTextCSS = css`
  font-size: 14px;
  line-height: 14px;
  color: white;
`;

const itemInputCSS = css`
  border: 1px solid #404040;
  background-color: transparent;
  height: 40px;
  color: white;
`;

const itemDescriptionTextCSS = css`
  font-size: 11px;
  line-height: 11px;
  color: #a7a7a7;
`;

export function RegisterPage() {
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const { data: registryStatus } = useRegistryStatus();

  const [jobRegistered, setJobRegistered] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [botlerFeeStr, setBotlerFeeStr] = useState("");
  const [description, setDescription] = useState("");
  const [valueStr, setValueStr] = useState("");

  const botlerFee = new BigNumber(botlerFeeStr || "0").times(
    new BigNumber(10).pow(18)
  );
  const value = new BigNumber(valueStr || "0").times(new BigNumber(10).pow(18));

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    setState: (n: string) => void
  ) => {
    const strVal = e.target.value;

    if (!strVal) {
      setState("");

      return;
    }

    const bigNumVal = new BigNumber(strVal).times(new BigNumber(10).pow(18));

    if (!bigNumVal.isNaN()) {
      setState(strVal);
    }
  };

  const handleRegister = async () => {
    if (!wallet || !wallet.isValid) return;

    try {
      const receipt = await registryContract.methods
        .registerJob(address, name, description, botlerFee?.toString() || "0")
        .send({
          from: wallet.address,
          value: value?.toString() || "0",
          gas: GAS_LIMIT.default,
        });

      setTxHash(receipt.senderTxHash);

      setJobRegistered(true);
    } catch {}
  };

  return (
    <Section>
      {jobRegistered ? (
        <Column
          style={{
            background: "#131313",
            padding: "120px 0 24px 0",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", position: "relative", height: 210 }}>
            <img
              src="/assets/images/registerCompletedDecoration.png"
              alt=""
              width="100%"
              style={{ position: "absolute", zIndex: 0 }}
            />
            <Row style={{ justifyContent: "center" }}>
              <img
                src="/assets/images/registerCompletedCharacter.png"
                alt=""
                height="240px"
                style={{
                  zIndex: 0,
                  position: "absolute",
                  top: "-60px",
                }}
              />
            </Row>
          </div>
          <span
            className={css`
              font-size: 22px;
              line-height: 22px;
              color: white;
              margin-bottom: 16px;
            `}
          >
            Your Job registered successfully!
          </span>
          <span
            className={css`
              font-size: 14px;
              line-height: 14px;
              color: #cacaca;
              margin-bottom: 6px;
            `}
          >
            View your transaction here:
          </span>
          <Row
            as="button"
            style={{ justifyContent: "center", gap: 4 }}
            onClick={() => navigator.clipboard.writeText(txHash)}
          >
            <span
              className={css`
                font-size: 14px;
                line-height: 14px;
                color: #1564ef;
              `}
            >
              {txHash}{" "}
            </span>
            <img src="/assets/images/copy.svg" alt="copy" width={10} />
          </Row>
          <button
            className={css`
              font-size: 12px;
              line-height: 12px;
              color: gray;
              margin-top: 28px;
              padding: 8px 16px;
              border: 1px solid gray;
            `}
            onClick={() => navigate(routes.jobs)}
          >
            Return to Jobs
          </button>
        </Column>
      ) : (
        <Column style={{ gap: 32 }}>
          <Row
            style={{
              alignItems: "flex-end",
              height: "200px",
              gap: 32,
              width: "fit-content",
            }}
          >
            <img
              src="/assets/images/registerPageCharacter.png"
              alt=""
              width="360px"
              style={{ transform: "translate(0, 50%)", zIndex: 0 }}
            />
            <Column style={{ gap: 32, width: "fit-content" }}>
              <span
                className={css`
                  font-size: 24px;
                  line-height: 24px;
                  font-weight: 700;
                `}
              >
                <span style={{ color: "#1564FF" }}>Register&nbsp;</span>
                <span style={{ color: "white" }}>Job</span>
              </span>
              <span
                className={css`
                  font-size: 14px;
                  line-height: 21px;
                  color: white;
                  width: 480px;
                `}
              >
                Delegate a job to Botler. <br />
                Botlers are more interested in jobs with higer botler fee.
              </span>
            </Column>
          </Row>
          <Column
            style={{ gap: 24, zIndex: 1, background: "#131313", padding: 48 }}
          >
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Job Name</span>
              <input
                className={itemInputCSS}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className={itemDescriptionTextCSS}>
                Select a unique name for your Job.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Job Address</span>
              <input
                className={itemInputCSS}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className={itemDescriptionTextCSS}>
                Address of your Job-compatible contract to perform Job on.{" "}
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Botler Fee</span>
              <input
                className={itemInputCSS}
                value={botlerFeeStr}
                onChange={(e) => handleChangeInput(e, setBotlerFeeStr)}
              />
              <span className={itemDescriptionTextCSS}>
                Botler fee setting is optional, but at least the minimum amount
                must be set.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Description</span>
              <input
                className={itemInputCSS}
                style={{ height: 72 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Initial deposit</span>
              <input
                className={itemInputCSS}
                value={valueStr}
                onChange={(e) => handleChangeInput(e, setValueStr)}
              />
              <span className={itemDescriptionTextCSS}>
                Deposit KLAY to yout job. Select an amount that will satisfy
                multiple performances to start, then fund the Job directly once
                its operational.
              </span>
            </Column>
            <Row style={{ justifyContent: "flex-end", padding: "36px 0 0 0" }}>
              <Column
                style={{
                  width: "fit-content",
                  minWidth: 240,
                  fontSize: 14,
                  lineHeight: "14px",
                }}
              >
                <Column
                  style={{
                    color: "#a7a7a7",
                    gap: 8,
                  }}
                >
                  <Row style={{ justifyContent: "space-between" }}>
                    <span>Initial deposit</span>
                    <span>{formatTokenAmount(value)} KLAY</span>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    <span>Registration Fee</span>
                    <span>
                      {formatTokenAmount(
                        registryStatus?.registrationFee || new BigNumber(0)
                      )}{" "}
                      KLAY
                    </span>
                  </Row>
                </Column>
                <Column>
                  <Row
                    style={{
                      margin: "16px 0",
                      height: 1,
                      backgroundColor: "white",
                    }}
                  />
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {formatTokenAmount(
                      value.plus(
                        registryStatus?.registrationFee || new BigNumber(0)
                      )
                    )}{" "}
                    KLAY
                  </Row>
                </Column>
                <Row
                  style={{
                    justifyContent: "flex-end",
                    gap: 8,
                    padding: "32px 0 0 0",
                  }}
                >
                  <button
                    className={css`
                      padding: 12px 20px;
                      border: 1px solid #a7a7a7;
                      color: white;
                    `}
                  >
                    Cancel
                  </button>
                  <PrimaryButton onClick={handleRegister}>
                    Register Job
                  </PrimaryButton>
                </Row>
              </Column>
            </Row>
          </Column>
        </Column>
      )}
    </Section>
  );
}
