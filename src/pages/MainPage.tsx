import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { Table } from "../components/Table";
import { JOBLIST_COLUMNS } from "../constants";
import { useJobs } from "../hooks/useJobs";
import { useWallet } from "../hooks/useWallet";
import { routes } from "../routes";

export function MainPage() {
  const { data } = useJobs();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const [searchStr, setSearchStr] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showMyJobOnly, setShowMyJobOnly] = useState(false);

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result = [...data];

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
  }, [data, searchStr, showActiveOnly, wallet, showMyJobOnly]);

  return (
    <Column>
      <Section style={{ padding: "32px 64px" }}>
        <Row style={{ justifyContent: "space-between" }}>
          <h1>Job List</h1>
          <Button>Register Job</Button>
        </Row>
      </Section>
      <Section>
        <Column style={{ gap: 16 }}>
          <input
            placeholder="Find a Job using job name or address"
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <Column style={{ gap: 8 }}>
            <Row style={{ justifyContent: "space-between" }}>
              <Row style={{ width: "fit-content", gap: 2 }}>
                <button
                  onClick={() => setShowMyJobOnly(false)}
                  style={{
                    fontWeight: showMyJobOnly ? "normal" : "bold",
                    padding: 4,
                    borderBottom: showMyJobOnly ? "unset" : "1px solid black",
                  }}
                >
                  All jobs
                </button>
                <button
                  onClick={() => setShowMyJobOnly(true)}
                  style={{
                    fontWeight: showMyJobOnly ? "bold" : "normal",
                    padding: 4,
                    borderBottom: showMyJobOnly ? "1px solid black" : "unset",
                  }}
                >
                  My Jobs
                </button>
              </Row>
              <Row
                style={{
                  width: "fit-content",
                  marginTop: 8,
                  gap: 4,
                }}
              >
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={() =>
                    setShowActiveOnly((prev) => {
                      console.log(prev);
                      return !prev;
                    })
                  }
                />
                <span>Show only activated jobs</span>
              </Row>
            </Row>
            <Table
              columns={JOBLIST_COLUMNS}
              data={filteredData}
              rowProps={(row) => ({
                key: row.original.jid,
                onClick: () => navigate(`${routes.job}/${row.original.jid}`),
                style: { height: 36, cursor: "pointer" },
              })}
              headerProps={(header) => ({
                key: header.id,
                style: { fontWeight: header.isSorted ? "bold" : "normal" },
              })}
            />
          </Column>
          {!wallet && showMyJobOnly && (
            <Row style={{ padding: "48px 0", justifyContent: "center" }}>
              You need to connect your wallet first to see the Job you
              registered.
            </Row>
          )}
        </Column>
      </Section>
    </Column>
  );
}
