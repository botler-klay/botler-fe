/* eslint-disable react-hooks/exhaustive-deps */
import { css } from "@emotion/css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { CheckBox } from "../components/CheckBox";
import { JobCard } from "../components/JobCard";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { useJobs } from "../hooks/useJobs";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";
import { compareBigNumber } from "../utils/bignumber";

export function JobsPage() {
  const { data } = useJobs();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const [searchStr, setSearchStr] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showMyJobOnly, setShowMyJobOnly] = useState(false);

  const [sortKey, setSortKey] = useState<
    "balance" | "feePerCall" | "accumFee" | "default"
  >("default");

  const sortedData = useMemo(() => {
    if (sortKey === "default" || !data) return data;

    return [...data].sort((a, b) => compareBigNumber(a[sortKey], b[sortKey]));
  }, [JSON.stringify(data), sortKey]);

  const filteredData = useMemo(() => {
    console.log("filter");
    if (!sortedData) return [];

    let result = [...sortedData];

    if (searchStr) {
      const lc = searchStr.toLowerCase();

      result = result.filter(
        (job) =>
          job.address.toLowerCase() === lc ||
          job.name.toLowerCase().includes(lc)
      );
    }

    if (showActiveOnly) {
      result = result.filter((job) => job.status === "Active");
    }

    if (showMyJobOnly) {
      if (!wallet) return [];

      result = result.filter(
        (job) => job.owner.toLowerCase() === wallet.address.toLowerCase()
      );
    }

    return result;
  }, [
    JSON.stringify(sortedData),
    searchStr,
    showActiveOnly,
    wallet,
    showMyJobOnly,
  ]);

  return (
    <Column
      className={css`
        gap: 64px;
      `}
    >
      <Section>
        <Row
          className={css`
            gap: 60px;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <Column style={{ width: "fit-content" }}>
            <h1
              className={css`
                font-weight: 700;
                font-size: 24px;
                line-height: 24px;
                color: #d8d8d8;
                margin-bottom: 24px;
              `}
            >
              Short{" "}
              <span
                className={css`
                  color: #1564ff;
                `}
              >
                Description
              </span>
            </h1>
            <span
              className={css`
                color: #d8d8d8;
                font-size: 14px;
                line-height: 21px;
                width: 480px;
                margin-bottom: 48px;
              `}
            >
              Give some short description about the service. Give some short
              description about the service. Depending on the length of the
              sentence, the size of this block can be adjusted Give some short
              description about the service. Give some short description about
              the service. Depending on the length of the sentence, the size of
              this block can be adjusted
            </span>
            <Row>
              <PrimaryButton onClick={() => navigate(routes.register)}>
                Register Job
              </PrimaryButton>
              <button
                className={css`
                  padding: 12px 20px;
                  color: #1564ff;
                  width: fit-content;
                  font-size: 14px;
                  line-height: 14px;
                `}
              >
                Go to Docs
              </button>
            </Row>
          </Column>
          <img
            src="/assets/images/jobsPageCharacter.svg"
            alt=""
            className={css`
              width: 360px;
              transform: translate(57px, 0);
            `}
          />
        </Row>
      </Section>
      <Section>
        <Column style={{ gap: 16 }}>
          <input
            className={css`
              border: 1px solid #a7a7a7;
              background-color: transparent;
              padding: 8px 20px;
              color: white;
            `}
            placeholder="Find a Job using job name or address"
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <Column style={{ gap: 12 }}>
            <Row
              style={{
                gap: 2,
                fontSize: 14,
                lineHeight: "14px",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowMyJobOnly(false)}
                style={{
                  fontWeight: showMyJobOnly ? "normal" : "bold",
                  padding: "12px 32px",
                  borderBottom: showMyJobOnly ? "unset" : "2px solid #1564FF",
                  color: showMyJobOnly ? "#a7a7a7" : "#1564FF",
                  zIndex: 1,
                }}
              >
                All jobs
              </button>
              <button
                onClick={() => setShowMyJobOnly(true)}
                style={{
                  fontWeight: showMyJobOnly ? "bold" : "normal",
                  padding: "12px 32px",
                  color: showMyJobOnly ? "#1564FF" : "#a7a7a7",
                  borderBottom: showMyJobOnly ? "2px solid #1564FF" : "unset",
                  zIndex: 1,
                }}
              >
                My Jobs
              </button>
              <div
                className={css`
                  position: absolute;
                  bottom: 0.5px;
                  height: 1px;
                  width: 100%;
                  background-color: #a7a7a7;
                  z-index: 0;
                `}
              />
            </Row>
            <Row style={{ justifyContent: "space-between" }}>
              <Row
                style={{ width: "fit-content" }}
                className={css`
                  font-size: 14px;
                  line-height: 14px;
                  gap: 32px;
                `}
              >
                <button
                  style={{ color: sortKey === "balance" ? "white" : "#a7a7a7" }}
                  onClick={() =>
                    setSortKey((prev) =>
                      prev === "balance" ? "default" : "balance"
                    )
                  }
                >
                  Balance ∧
                </button>
                <button
                  style={{
                    color: sortKey === "feePerCall" ? "white" : "#a7a7a7",
                  }}
                  onClick={() =>
                    setSortKey((prev) =>
                      prev === "feePerCall" ? "default" : "feePerCall"
                    )
                  }
                >
                  Fee/Call ∧
                </button>
                <button
                  style={{
                    color: sortKey === "accumFee" ? "white" : "#a7a7a7",
                  }}
                  onClick={() =>
                    setSortKey((prev) =>
                      prev === "accumFee" ? "default" : "accumFee"
                    )
                  }
                >
                  Accumulated Fee ∧
                </button>
              </Row>
              <Row
                className={css`
                  margin-top: 8px;
                  gap: 4px;
                  align-items: center;
                `}
                style={{ width: "fit-content" }}
              >
                <CheckBox
                  checked={showActiveOnly}
                  onChange={() =>
                    setShowActiveOnly((prev) => {
                      console.log(prev);
                      return !prev;
                    })
                  }
                />
                <span
                  className={css`
                    font-size: 14px;
                    color: #a7a7a7;
                  `}
                >
                  Show only activated jobs
                </span>
              </Row>
            </Row>

            <div
              className={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 10px;
              `}
            >
              {filteredData.map((job) => (
                <JobCard key={job.address} job={job} />
              ))}
            </div>
          </Column>
          {!wallet && showMyJobOnly && (
            <Row
              className={css`
                padding: 120px 0;
                justify-content: center;
                color: #a7a7a7;
              `}
            >
              You need to connect your wallet first to see the Job you
              registered.
            </Row>
          )}
        </Column>
      </Section>
    </Column>
  );
}
