import { css } from "@emotion/css";
import BigNumber from "bignumber.js";
import { PrimaryButton } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { GAS_LIMIT } from "../constants";
import { rewardContract } from "../contracts/contracts";
import { useReward } from "../hooks/useReward";
import { useWallet } from "../hooks/useWallet";
import { formatTokenAmount } from "../utils/bignumber";

export function RewardsPage() {
  const { wallet } = useWallet();
  const { data, mutate } = useReward();

  const handleWithdraw = async () => {
    if (!wallet || !wallet.isValid) return;

    await rewardContract.methods
      .claimKlay()
      .send({ from: wallet.address, gas: GAS_LIMIT.default });

    mutate();
  };

  return (
    <Section>
      <Column style={{ padding: "0 64px", gap: 80 }}>
        <Row style={{ justifyContent: "center" }}>
          <img
            src="/assets/images/rewardsPageCharacter.png"
            alt=""
            width="240px"
          />
        </Row>
        <Column style={{ color: "white", gap: 16 }}>
          <Row style={{ fontSize: 20, lineHeight: "10px", fontWeight: 700 }}>
            KLAY
          </Row>
          <Row style={{ height: 2, background: "#4B4B4B" }} />
          <Row style={{ justifyContent: "space-between" }}>
            <span>So far you received</span>
            <span>
              {formatTokenAmount(data?.claimedKlay || new BigNumber(0))} KLAY
            </span>
          </Row>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <span>Claimable</span>
            <Row
              className={css`
                background: #2a2b30;
                border: 1px solid #404040;
                gap: 16px;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                line-height: 24px;
              `}
              style={{ width: 600, height: 64 }}
            >
              <span>
                {formatTokenAmount(
                  data
                    ? data.vestedKlay.minus(data.claimedKlay)
                    : new BigNumber(0)
                )}
              </span>
              <span style={{ color: "#a7a7a7" }}>KLAY</span>
            </Row>
          </Row>
          <Row style={{ justifyContent: "flex-end" }}>
            <PrimaryButton onClick={handleWithdraw}>Claim</PrimaryButton>
          </Row>
        </Column>
        <Column style={{ color: "white", gap: 16 }}>
          <Row style={{ fontSize: 20, lineHeight: "10px", fontWeight: 700 }}>
            BOTLER
          </Row>
          <Row style={{ height: 2, background: "#4B4B4B" }} />
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <span>Pending</span>
            <Row
              className={css`
                background: #2a2b30;
                border: 1px solid #404040;
                gap: 16px;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                line-height: 24px;
              `}
              style={{ width: 600, height: 64 }}
            >
              <span>XXXX.XXXX</span>
              <span style={{ color: "#a7a7a7" }}>BOTLER</span>
            </Row>
          </Row>
          <Row
            className={css`
              justify-content: flex-end;
              font-size: 12px;
              line-height: 12px;
              color: #a7a7a7;
            `}
          >
            It is possible to receive botler tokens accumulated after the TGE.
          </Row>
        </Column>
      </Column>
    </Section>
  );
}
