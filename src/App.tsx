import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KongPage from "./page/KongPage";
import NavBar from "./components/Layout/NavBar/NavBar";
import KafkaPage from "./page/KafkaPage";
import HealthCheckerPage from "./page/HealthCheckerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<NavBar />}>
          <Route path="/kong" element={<KongPage />} />
          <Route path="/kafka" element={<KafkaPage />} />
          <Route path="/healthChecker" element={<HealthCheckerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
