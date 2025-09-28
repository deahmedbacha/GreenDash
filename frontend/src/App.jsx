import Layout from "./components/Layout";
import Dashboard from "./features/dashboard/Dashboard";
import Overview from "./features/overview/Overview";
import { Routes, Route } from "react-router-dom";

import { exportCsv } from "./api/client";

export default function App() {
  const handleExport = async () => {
    const res = await exportCsv({ limit: 500 });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url; link.download = "sustainability_report.csv";
    document.body.appendChild(link); link.click(); link.remove();
    window.URL.revokeObjectURL(url);
  };//

  return (

<Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
