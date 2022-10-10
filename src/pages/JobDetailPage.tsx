import { css } from "@emotion/css";
import BigNumber from "bignumber.js";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Column, Row } from "../components/Layouts";
import { Modal } from "../components/Modal";
import { BalanceModalContent } from "../components/ModalContents/BalanceModalContent";
import { Section } from "../components/Section";
import { GAS_LIMIT } from "../constants";
import { registryContract } from "../contracts/contracts";
import { useJobs } from "../hooks/useJobs";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";
import { formatTokenAmount } from "../utils/bignumber";

const titleTextCSS = css`
  font-weight: 700;
  line-height: 24px;
  font-size: 24px;
  color: #ffffff;

  padding: 0 0 20px 0;
`;

const rowTitleTextCSS = css`
  font-weight: 600;
  line-height: 14px;
  color: #ffffff;
`;

const rowValueTextCSS = css`
  font-weight: 400;
  line-height: 14px;
  color: #cacaca;
`;

export function JobDetailPage() {
  const navigate = useNavigate();
  const { jid } = useParams();
  const { getJobDetail, mutate } = useJobs();
  const { wallet } = useWallet();

  const [isOpen, setIsOpen] = useState(false);
  const [changeFeeMode, setChangeFeeMode] = useState(false);
  const [changeFeeValueStr, setChangeFeeValueStr] = useState("");

  const changeFeeValue = new BigNumber(changeFeeValueStr || "0").times(
    new BigNumber(10).pow(18)
  );

  const jobDetail = getJobDetail(jid);

  if (!jobDetail) {
    navigate(routes.jobs);

    return <></>;
  }

  const {
    name,
    address,
    botlerFee,
    accumulatedFee,
    balance,
    active,
    description,
    callCount,
    jobOwner,
  } = jobDetail;

  const handleActivateJob = async () => {
    if (!wallet || !wallet.isValid) return;

    try {
      const receipt = await registryContract.methods
        .activateJob(address)
        .send({ from: wallet.address, gas: GAS_LIMIT.default });

      console.log(receipt);
      setIsOpen(false);
      mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeactivateJob = async () => {
    if (!wallet || !wallet.isValid) return;

    try {
      const receipt = await registryContract.methods
        .deactivateJob(address)
        .send({ from: wallet.address, gas: GAS_LIMIT.default });

      console.log(receipt);
      setIsOpen(false);
      mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const strVal = e.target.value;

    if (!strVal) {
      setChangeFeeValueStr("");

      return;
    }

    const bigNumVal = new BigNumber(strVal).times(new BigNumber(10).pow(18));

    if (!bigNumVal.isNaN()) {
      setChangeFeeValueStr(strVal);
    }
  };

  const handleChangeFee = async () => {
    if (!wallet || !wallet.isValid) return;

    try {
      const receipt = await registryContract.methods
        .changeJobBotlerFee(address, changeFeeValue.toString())
        .send({ from: wallet.address, gas: GAS_LIMIT.default });

      console.log(receipt);

      setChangeFeeMode(false);

      mutate();
    } catch (e) {
      console.error(e);

      setChangeFeeMode(false);
    }
  };

  return (
    <Section style={{ marginTop: 32 }}>
      <Column
        style={{
          position: "relative",
          padding: "70px 80px",
          boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.1)",
          background:
            "linear-gradient(233.91deg, #1B1B1B 5.86%, #0C0C0C 94.3%)",
          gap: 18,
          fontSize: 14,
          height: "fit-content",
        }}
      >
        <Row>
          <h1 className={titleTextCSS}>Job {name}</h1>
        </Row>
        <Row style={{ gap: 16 }}>
          <span className={rowTitleTextCSS}>Status</span>
          <Row style={{ width: "fit-content", position: "relative" }}>
            <span className={rowValueTextCSS}>
              {active ? "Active" : "Inactive"}
            </span>
            {active && (
              <img
                src="/assets/images/tabSelectedDot.svg"
                alt=""
                width="6px"
                style={{
                  position: "absolute",
                  right: -10,
                  top: "50%",
                  transform: "translate(0, -50%)",
                }}
              />
            )}
          </Row>
        </Row>
        <Row style={{ gap: 16 }}>
          <span className={rowTitleTextCSS}>Job Address</span>
          <button onClick={() => navigator.clipboard.writeText(address)}>
            <Row style={{ gap: 8 }}>
              <span
                className={rowValueTextCSS}
                style={{ borderBottom: "1px solid #cacaca" }}
              >
                {address}
              </span>
              <img src="/assets/images/copy.svg" alt="copy" width={10} />
            </Row>
          </button>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Row style={{ gap: 16, width: "fit-content" }}>
            <span className={rowTitleTextCSS}>Balance</span>
            <span className={rowValueTextCSS}>
              {formatTokenAmount(balance)} KLAY
            </span>
          </Row>
          <button
            className={css`
              border: 1px solid #1564ff;
              color: #1564ff;
              padding: 6px 14px;
            `}
            onClick={() => setIsOpen(true)}
            disabled={!wallet}
          >
            Add/Withdraw
          </button>
          <Modal isOpen={isOpen}>
            <BalanceModalContent
              close={() => setIsOpen(false)}
              balance={jobDetail.balance}
              jobAddress={address}
            />
          </Modal>
        </Row>
        <Row
          style={{ margin: "16px 0", height: 0.5, backgroundColor: "gray" }}
        />
        <Row style={{ gap: 16 }}>
          <span className={rowTitleTextCSS}>Description</span>
          <span
            className={rowValueTextCSS}
            style={{ width: "85%", whiteSpace: "normal" }}
          >
            {description}
          </span>
        </Row>
        <Row style={{ gap: 16, alignItems: "center" }}>
          <span className={rowTitleTextCSS}>Botler Fee</span>
          {changeFeeMode ? (
            <Row style={{ width: "fit-content", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <input
                  className={css`
                    border: 1px solid #404040;
                    background-color: transparent;
                    color: white;
                  `}
                  value={changeFeeValueStr}
                  onChange={handleChangeInput}
                />
                <span
                  className={css`
                    position: absolute;
                    right: 4px;
                    top: 50%;
                    transform: translate(0, -50%);
                    color: #cacaca;
                    font-size: 12px;
                    line-height: 12px;
                  `}
                >
                  KLAY
                </span>
              </div>
              <button onClick={() => setChangeFeeMode(false)}>
                <img
                  src="/assets/images/red_times.svg"
                  alt="cancel"
                  width="10px"
                />
              </button>
              <button onClick={handleChangeFee}>
                <img
                  src="/assets/images/green_check.svg"
                  alt="confirm"
                  width="10px"
                />
              </button>
            </Row>
          ) : (
            <Row style={{ width: "fit-content", gap: 8 }}>
              <span className={rowValueTextCSS}>
                {formatTokenAmount(botlerFee)} KLAY
              </span>
              {wallet?.isValid &&
                jobOwner.toLowerCase() === wallet.address.toLowerCase() && (
                  <button onClick={() => setChangeFeeMode(true)}>
                    <img
                      src="/assets/images/pencil.svg"
                      alt="edit"
                      width="8px"
                    />
                  </button>
                )}
            </Row>
          )}
        </Row>
        <Row style={{ gap: 16 }}>
          <span className={rowTitleTextCSS}>Accumulated Fee</span>
          <span className={rowValueTextCSS}>
            {formatTokenAmount(accumulatedFee)} KLAY
          </span>
        </Row>
        <Row style={{ gap: 16 }}>
          <span className={rowTitleTextCSS}>Number of Runs</span>
          <span className={rowValueTextCSS}>{callCount}</span>
        </Row>
        <button
          style={{
            marginTop: 16,
            fontSize: "14px",
            lineHeight: "14px",
            width: "fit-content",
            color: "#D8405B",
            borderBottom: "1px solid #D8405B",
          }}
          onClick={active ? handleDeactivateJob : handleActivateJob}
        >
          {active ? "Inactivate Job" : "Activate Job"}
        </button>
        <img
          src="/assets/images/jobDetailPageCharacter.png"
          alt=""
          width={280}
          className={css`
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(30%, 30%);
          `}
        />
      </Column>
    </Section>
  );
}
