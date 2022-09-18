import { useState } from "react";
import { Button } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";

export function RegisterPage() {
  const [jobRegistered, setJobRegistered] = useState(false);

  return (
    <Section>
      <Column style={{ gap: 32 }}>
        <span style={{ fontSize: 24, padding: "16px 0" }}>Register Job</span>
        <Column style={{ gap: 16 }}>
          <Column>
            <span>Job Name</span>
            <input />
            <span>Select a unique name for your Job.</span>
          </Column>
          <Column>
            <span>Job Address</span>
            <input />
            <span>
              Address of your Job-compatible contract to perform Job on.{" "}
            </span>
          </Column>
          <Column>
            <span>Fee per Call</span>
            <input />
            <span>
              Please write down how much fee will be charged per call.
            </span>
          </Column>
          <Column>
            <span>Botler Fee</span>
            <input />
            <span>
              Botler fee setting is optional, but at least the minimum amount
              must be set.
            </span>
          </Column>
          <Column>
            <span>Description</span>
            <input style={{ height: 36 }} />
            <span>
              Deposit XXXX to yout job. Select an amount that will satisfy
              multiple performances to start, then fund the Job directly once
              its operational.
            </span>
          </Column>
          <Column>
            <span>Initial deposit</span>
            <input />
            <span>
              Botler fee setting is optional, but at least the minimum amount
              must be set.
            </span>
          </Column>
        </Column>
        <Row style={{ justifyContent: "flex-end", padding: "32px 0" }}>
          <Column style={{ width: "fit-content", minWidth: 490 }}>
            {jobRegistered ? (
              <>
                <Row
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ lineHeight: "16px" }}>Register Fee</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      lineHeight: "20px",
                    }}
                  >
                    XX.X KLAY
                  </span>
                </Row>
              </>
            ) : (
              <>
                <Row style={{ justifyContent: "space-between" }}>
                  <span>Initial deposit</span>
                  <span>XXXXX KLAY</span>
                </Row>
                <Row style={{ justifyContent: "space-between" }}>
                  <span>Registration Fee</span>
                  <span>XXXX KLAY</span>
                </Row>
                <Row
                  style={{
                    margin: "16px 0",
                    height: 0.5,
                    backgroundColor: "gray",
                  }}
                />
                <Row style={{ justifyContent: "flex-end" }}>7000 KLAY</Row>
              </>
            )}
            <Row
              style={{
                justifyContent: "flex-end",
                gap: 8,
                padding: "32px 0",
              }}
            >
              <Button>Cancel</Button>
              <Button onClick={() => setJobRegistered(true)}>
                Register Job
              </Button>
            </Row>
            {jobRegistered && (
              <Column
                style={{
                  padding: "16px 24px",
                  backgroundColor: "lightGreen",
                  gap: 4,
                }}
              >
                <span>
                  Your job has registered! View your transaction here:
                </span>
                <button
                  style={{
                    lineHeight: "16px",
                    borderBottom: "1px solid black",
                    width: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  0xashfjksdnjgkwufoisjdngfdogfvdoajdnfbfjsdiaeokdjnfbvjfdkseaiosf
                </button>
              </Column>
            )}
          </Column>
        </Row>
      </Column>
    </Section>
  );
}
