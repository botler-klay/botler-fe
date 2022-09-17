import { useMemo, useState } from "react";
import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { Table } from "../components/Table";
import { JOBLIST_COLUMNS } from "../constants";
import { useJobs } from "../hooks/useJobs";

export function MainPage() {
  const { data } = useJobs();

  const [searchStr, setSearchStr] = useState("");

  const searchedData = useMemo(() => {
    if (!searchStr || !data) return data;

    const lc = searchStr.toLowerCase();

    return data.filter(
      (job) =>
        job.address.toLowerCase() === lc || job.name.toLowerCase().includes(lc)
    );
  }, [data, searchStr]);

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
                <button>All jobs</button>
                <button>My Jobs</button>
              </Row>
              <Row style={{ width: "fit-content" }}>
                <input type="checkbox" />
                <span>Show only activated jobs</span>
              </Row>
            </Row>
          </Column>
          <Table columns={JOBLIST_COLUMNS} data={searchedData || []} />
        </Column>
      </Section>
    </Column>
  );
}
