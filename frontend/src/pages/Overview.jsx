import { useEffect, useState } from "react";
import { getKpis, getSummary, getTrends, getLeaderboard, getCompliance } from "../api/client";
import KPI from "../components/KPI";
import ChartCard from "../components/ChartCard";
import RegionCO2Chart from "../features/dashboard/RegionCO2Chart";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Overview() {
  const [kpis, setKpis] = useState(null);
  const [summary, setSummary] = useState([]);
  const [trend, setTrend] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [compliance, setCompliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [k, s, t, l, c] = await Promise.all([
          getKpis(),
          getSummary(),
          getTrends({ metric: "CO2_Emissions_tCO2" }),
          getLeaderboard(),
          getCompliance()
        ]);

        setKpis(k);
        setSummary(s);
        setLeaderBoard(l);
        setCompliance(c);

        // map trend to usable form
        setTrend(t.map(r => ({
          date: r.Date?.slice(0, 10) ?? r.Date,
          value: r.value
        })));

      } catch (err) {
        setError(err.message || "Error loading overview");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total CO₂" value={kpis?.totalCO2?.toLocaleString()} />
        <KPI label="Avg Carbon Intensity" value={kpis?.avgCI?.toFixed(2)} />
        <KPI label="Avg Efficiency" value={kpis?.avgEff?.toFixed(2) + "%"} />
        <KPI label="Avg Renewable Share" value={(kpis?.avgRenewable * 100).toFixed(1) + "%"} />
      </div>

      {/* Trend chart */}
      <ChartCard title="Global CO₂ Trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#34d399" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Region CO₂ Chart */}
      <RegionCO2Chart summary={summary} />

      {/* Leaderboard / Compliance section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Lowest Carbon Intensity Regions">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leaderboard}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgCarbon" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Compliance Alerts">
          <div className="p-4">
            <div>Non-compliant count: {compliance.nonCompliantCount}</div>
            {/* you can map compliance.sampleRecords etc */}
            {compliance.sampleRecords && (
              <ul className="mt-2 space-y-1">
                {compliance.sampleRecords.map((r, i) => (
                  <li key={i} className="text-xs text-neutral-400">
                    {r.Region} on {new Date(r.Date).toLocaleDateString()}: CI = {r.Carbon_Intensity_gCO2_per_kWh}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
