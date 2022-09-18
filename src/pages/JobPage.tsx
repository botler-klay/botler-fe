import { useNavigate, useParams } from "react-router-dom";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { useJobs } from "../hooks/useJobs";
import { routes } from "../routes";

export function JobPage() {
  const navigate = useNavigate();
  const { jid } = useParams();
  const { getJobDetail } = useJobs();

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
    gas,
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
          <Row style={{ gap: 16 }}>
            <span>Balance</span>
            <span>{balance}</span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Job ID</span>
            <span>{jid}</span>
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
            <span>Expected Gas</span>
            <span>{gas}</span>
          </Row>
          <Row style={{ gap: 16 }}>
            <span>Number of Runs</span>
            <span>{numOfRuns}</span>
          </Row>
          <button style={{ position: "absolute", bottom: 32, right: 32 }}>
            {status === "Active" ? "Inactivate Job" : "Activate Job"}
          </button>
        </Column>
      </Section>
    </Column>
  );
}
