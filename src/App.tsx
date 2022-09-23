import { css } from "@emotion/css";
import ReactModal from "react-modal";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useWalletEvent } from "./hooks/useWallet";
import { JobPage, MainPage, RegisterPage } from "./pages";
import { RewardsPage } from "./pages/RewardsPage";
import { routes } from "./routes";

function App() {
  useWalletEvent();

  ReactModal.setAppElement("body");

  return (
    <div
      className={css`
        font-family: "Helvetica";
        height: 100vh;
        min-height: 960px;
        background-color: black;
      `}
    >
      <Header />
      <Routes>
        <Route path={routes.main} element={<MainPage />} />
        <Route path={`${routes.job}/:jid`} element={<JobPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.rewards} element={<RewardsPage />} />
      </Routes>
    </div>
  );
}

export default App;
