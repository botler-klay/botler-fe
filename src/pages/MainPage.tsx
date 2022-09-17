import { Column, Row } from "../components/Layouts";
import { Section } from "../components/Section";
import { Table } from "../components/Table";
import { JOBLIST_COLUMNS } from "../constants";
import { useJobs } from "../hooks/useJobs";

export function MainPage() {
  const { data } = useJobs();

  return (
    <Column>
      <Section>
        <Row style={{ justifyContent: "space-between" }}>
          <h1>Job List</h1>
          <button>Register new upkeep</button>
        </Row>
      </Section>
      <Section>
        <Column>
          <input placeholder="Find a Job using job name or address" />
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
          {data && <Table columns={JOBLIST_COLUMNS} data={data} />}
        </Column>
      </Section>
    </Column>
  );
}
