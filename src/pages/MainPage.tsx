import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    if (showMyJobOnly && wallet) {
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
          <button>Register new upkeep</button>
        </Row>
      </Section>
      <Section>
        <Column>
          <input
            placeholder="Find a Job using job name or address"
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <Column>
            <Row style={{ justifyContent: "space-between" }}>
              <Row style={{ width: "fit-content" }}>
                <button
                  onClick={() => setShowMyJobOnly(false)}
                  style={{ fontWeight: showMyJobOnly ? "normal" : "bold" }}
                >
                  All jobs
                </button>
                <button
                  onClick={() => setShowMyJobOnly(true)}
                  style={{
                    fontWeight: showMyJobOnly ? "bold" : "normal",
                    cursor: wallet ? "pointer" : "not-allowed",
                  }}
                  disabled={!wallet}
                >
                  My Jobs
                </button>
              </Row>
              <Row style={{ width: "fit-content" }}>
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
          </Column>
          <Table
            columns={JOBLIST_COLUMNS}
            data={filteredData || []}
            rowProps={(row) => ({
              key: row.original.jid,
              onClick: () => navigate(`${routes.job}/${row.original.jid}`),
              style: { height: 36, cursor: "pointer" },
            })}
            headerProps={(header) => ({
              key: header.id,
              style: { fontWeight: "bold" },
            })}
          />
        </Column>
      </Section>
    </Column>
  );
}
