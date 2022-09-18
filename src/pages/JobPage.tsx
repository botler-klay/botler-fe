import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Modal } from "../components/Modal";
import { BalanceModalContent } from "../components/ModalContents/BalanceModalContent";
import { Section } from "../components/Section";
import { useJobs } from "../hooks/useJobs";
import { routes } from "../routes";

export function JobPage() {
  const navigate = useNavigate();
  const { jid } = useParams();
  const { getJobDetail } = useJobs();

  const [isOpen, setIsOpen] = useState(false);

  const jobDetail = getJobDetail(jid);

  if (!jobDetail) {
    navigate(routes.main);

    return <></>;
  }

  const {
    name,
    address,
    feePerCall,
    accumFee,
    balance,
    status,
    description,
    numOfRuns,
  } = jobDetail;

  return (
    <Column>
      <Section style={{ padding: "32px 64px" }}>
        <Row>
          <h1>Job {name}</h1>
        </Row>
      </Section>
      <Section>
        <Column
          style={{
            position: "relative",
            padding: 32,
            boxShadow: "0px 0px 17px rgba(0, 0, 0, 0.1)",
            gap: 8,
          }}
        >
          <Row style={{ gap: 16 }}>
            <span>Status</span>
            <span>{status}</span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Job Address</span>
            <span>{address}</span>
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Row style={{ gap: 16, width: "fit-content" }}>
              <span>Balance</span>
              <span>{balance}</span>
            </Row>
            <Button onClick={() => setIsOpen(true)}>Add/Withdraw</Button>
            <Modal isOpen={isOpen}>
              <BalanceModalContent
                close={() => setIsOpen(false)}
                balance={jobDetail.balance}
              />
            </Modal>
          </Row>
          <Row
            style={{ margin: "16px 0", height: 0.5, backgroundColor: "gray" }}
          />
          <Row style={{ gap: 16 }}>
            <span>Description</span>
            <span style={{ width: "85%", whiteSpace: "normal" }}>
              {description}
            </span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Fee per Call</span>
            <span>{feePerCall}</span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Accumulated Fee</span>
            <span>{accumFee}</span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Number of Runs</span>
            <span>{numOfRuns}</span>
          </Row>
          <button
            style={{
              marginTop: 16,
              lineHeight: "16px",
              width: "fit-content",
              borderBottom: "1px solid black",
            }}
          >
            {status === "Active" ? "Inactivate Job" : "Activate Job"}
          </button>
        </Column>
      </Section>
    </Column>
  );
}
