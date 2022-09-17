import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useWalletEvent } from "./hooks/useWallet";
import { JobPage, MainPage, RegisterPage } from "./pages";
import { routes } from "./routes";

function App() {
  useWalletEvent();

  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.main} element={<MainPage />} />
        <Route path={`${routes.job}/:jid`} element={<JobPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
