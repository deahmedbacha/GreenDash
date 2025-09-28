import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE + "/api/metrics",
  timeout: 15000,
});

// KPIs (totals + averages)
export const getKpis = () =>
  api.get("/kpis").then((r) => r.data);

// Regional summary
export const getSummary = () =>
  api.get("/summary").then((r) => r.data);

// Time series trends
export const getTrends = (params) =>
  api.get("/trends", { params }).then((r) => r.data);

// Leaderboard (lowest avg carbon intensity, etc.)
export const getLeaderboard = () =>
  api.get("/leaderboard").then((r) => r.data);

// Compliance checks
export const getCompliance = () =>
  api.get("/compliance").then((r) => r.data);

// Fetch all raw data
export const getAllData = (params) =>
  api.get("/", { params }).then((r) => r.data);

// Export CSV
export const exportCsv = (params) =>
  api.get("/export", {
    params: { ...params, format: "csv" },
    responseType: "blob",
  });

export default api;
