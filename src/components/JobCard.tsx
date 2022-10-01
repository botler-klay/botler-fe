import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { Job } from "../types/types";
import { formatTokenAmount } from "../utils/bignumber";
import { Column, Row } from "./Layouts";

export function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();

  return (
    <Column
      as="button"
      onClick={() => navigate(`${routes.job}/${job.jid}`)}
      className={css`
        height: 240px;
        background: linear-gradient(233.7deg, #1b1b1b 5.84%, #0c0c0c 93.99%);
        padding: 44px 24px;
        color: #d8d8d8;
        font-size: 12px;
        justify-content: space-between;
        text-align: start;
        border-top: 4px solid ${job.active ? "#1564FF" : "#A7A7A7"};

        &:hover {
          border-top: unset;
          background: ${job.active
            ? "linear-gradient(233.32deg, #1564FF -27.79%, #0B0B0B 87.01%)"
            : "linear-gradient(233.7deg, #A7A7A7 5.84%, #0B0B0B 88.94%)"};
        }
      `}
    >
      <Column>
        <h2
          style={{
            fontSize: "22px",
            lineHeight: "22px",
            fontWeight: 700,
          }}
        >
          {job.name}
        </h2>
        <span>{job.address}</span>
      </Column>
      <Column style={{ gap: 4 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <span>Balance</span>
          <span>{formatTokenAmount(job.balance)}</span>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <span>Fee / Call</span>
          <span>{formatTokenAmount(job.botlerFee)}</span>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <span>Accumulated Fee</span>
          <span>{formatTokenAmount(job.accumulatedFee)}</span>
        </Row>
      </Column>
    </Column>
  );
}
