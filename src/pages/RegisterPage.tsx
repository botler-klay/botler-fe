import { css } from "@emotion/css";
import { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";

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
  const [jobRegistered, setJobRegistered] = useState(false);

  return (
    <Section>
      {jobRegistered ? (
        <Column
          style={{
            background: "#131313",
            padding: "120px 0 60px 0",
            width: "100%",
            marginTop: 80,
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", position: "relative", height: 210 }}>
            <img
              src="/assets/images/registerCompletedDecoration.svg"
              alt=""
              width="100%"
              style={{ position: "absolute", zIndex: 0 }}
            />
            <Row style={{ justifyContent: "center" }}>
              <img
                src="/assets/images/registerCompletedCharacter.svg"
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
          <Row as="button" style={{ justifyContent: "center", gap: 4 }}>
            <span
              className={css`
                font-size: 14px;
                line-height: 14px;
                color: #1564ef;
              `}
            >
              0xashfjksdnjgkwufoisjdngfdogfvdoajdnfbfjsdiaeokdjnfbvjfdkseaiosf{" "}
            </span>
            <img src="/assets/images/copy.svg" alt="copy" width={10} />
          </Row>
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
              src="/assets/images/registerPageCharacter.svg"
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
                Give some short description about the service. Give some short
                description about the service. Depending on the length of the
                sentence, the size of this block can be adjusted
              </span>
            </Column>
          </Row>
          <Column
            style={{ gap: 24, zIndex: 1, background: "#131313", padding: 48 }}
          >
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Job Name</span>
              <input className={itemInputCSS} />
              <span className={itemDescriptionTextCSS}>
                Select a unique name for your Job.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Job Address</span>
              <input className={itemInputCSS} />
              <span className={itemDescriptionTextCSS}>
                Address of your Job-compatible contract to perform Job on.{" "}
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Fee per Call</span>
              <input className={itemInputCSS} />
              <span className={itemDescriptionTextCSS}>
                Please write down how much fee will be charged per call.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Botler Fee</span>
              <input className={itemInputCSS} />
              <span className={itemDescriptionTextCSS}>
                Botler fee setting is optional, but at least the minimum amount
                must be set.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Description</span>
              <input className={itemInputCSS} style={{ height: 36 }} />
              <span className={itemDescriptionTextCSS}>
                Deposit XXXX to yout job. Select an amount that will satisfy
                multiple performances to start, then fund the Job directly once
                its operational.
              </span>
            </Column>
            <Column style={{ gap: 8 }}>
              <span className={itemTitleTextCSS}>Initial deposit</span>
              <input className={itemInputCSS} />
              <span className={itemDescriptionTextCSS}>
                Botler fee setting is optional, but at least the minimum amount
                must be set.
              </span>
            </Column>
          </Column>
          <Row style={{ justifyContent: "flex-end", padding: "32px 0" }}>
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
                  <span>XXXXX KLAY</span>
                </Row>
                <Row style={{ justifyContent: "space-between" }}>
                  <span>Registration Fee</span>
                  <span>XXX KLAY</span>
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
                  XXXXX KLAY
                </Row>
              </Column>
              <Row
                style={{
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "32px 0",
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
                <PrimaryButton onClick={() => setJobRegistered(true)}>
                  Register Job
                </PrimaryButton>
              </Row>
            </Column>
          </Row>
        </Column>
      )}
    </Section>
  );
}
