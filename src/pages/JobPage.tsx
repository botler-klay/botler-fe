import { useParams } from "react-router-dom";

export function JobPage() {
  let { jid } = useParams();
  return <>{jid}</>;
}
