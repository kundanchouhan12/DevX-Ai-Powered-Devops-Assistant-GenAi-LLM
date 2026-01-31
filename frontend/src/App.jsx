import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dashboard with jobId support */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:jobId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
