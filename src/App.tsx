import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useWalletEvent } from "./hooks/useWallet";
import { JobPage, MainPage, RegisterPage } from "./pages";

function App() {
  useWalletEvent();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/job/:jid" element={<JobPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
