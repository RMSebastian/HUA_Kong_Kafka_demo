import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogPage from "./page/LogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
