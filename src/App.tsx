import { css } from "@emotion/css";
import ReactModal from "react-modal";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { useWalletEvent } from "./hooks/useWallet";
import { JobDetailPage, JobsPage, RegisterPage } from "./pages";
import { RewardsPage } from "./pages/RewardsPage";
import { routes } from "./routes";

const pageCSS = css`
  font-family: "Helvetica";
  min-height: 100vh;
  background-color: black;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-bottom: 128px;
`;

function App() {
  useWalletEvent();

  ReactModal.setAppElement("body");

  return (
    <div className={pageCSS}>
      <Header />
      <Routes>
        <Route path={routes.jobs} element={<JobsPage />} />
        <Route path={`${routes.job}/:jid`} element={<JobDetailPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.rewards} element={<RewardsPage />} />
        <Route path="*" element={<Navigate replace to={routes.jobs} />} />
      </Routes>
    </div>
  );
}

export default App;
