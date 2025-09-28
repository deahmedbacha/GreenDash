import { useEffect, useMemo, useState } from "react";
import KPI from "../../components/KPI";
import ChartCard from "../../components/ChartCard";
import RegionFilter from "./RegionFilter";
import DateRange from "./DateRange";
import Loading from "../../components/Loading";
import RegionCO2Chart from "./RegionCO2Chart";
import ErrorState from "../../components/ErrorState";
import { getKpis, getSummary, getTrends, exportCsv } from "../../api/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import Layout from "../../components/Layout";


export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [summary, setSummary] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [region, setRegion] = useState("");
  const [range, setRange] = useState({ from: null, to: null });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const [k, s] = await Promise.all([getKpis(), getSummary()]);
        setKpis(k);
        setSummary(s);

        // default trend: CO2 (EU if chosen)
        const t = await getTrends({
          region: region || undefined,
          metric: "CO2_Emissions_tCO2",
          ...(range.from ? { from: range.from } : {}),
          ...(range.to ? { to: range.to } : {}),
        });
        setTrend(t.map(d => ({ date: d.Date?.slice(0,10) || d.Date, value: d.value })));
      } catch (e) {
        setErr(e.message || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [region, range.from, range.to]);

  const exportHandler = async () => {
    const res = await exportCsv({
      region: region || undefined,
      from: range.from || undefined,
      to: range.to || undefined,
      limit: 500
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sustainability_report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const niceNumber = (n, unit="") => {
    if (n === null || n === undefined) return "—";
    if (Math.abs(n) >= 1e9) return (n/1e9).toFixed(2) + "B" + unit;
    if (Math.abs(n) >= 1e6) return (n/1e6).toFixed(2) + "M" + unit;
    if (Math.abs(n) >= 1e3) return (n/1e3).toFixed(2) + "K" + unit;
    return n.toFixed ? n.toFixed(2) + unit : String(n) + unit;
  };

  const summarySorted = useMemo(
    () => [...summary].sort((a,b) => (b.totalCO2 ?? 0) - (a.totalCO2 ?? 0)),
    [summary]
  );

  if (loading) return <Loading />;
  if (err) return <ErrorState message={err} />;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Layout title="Dashboard" subtitle="Overview of sustainability metrics">
      <div className="flex flex-wrap items-center gap-3">
        <RegionFilter value={region} onChange={setRegion} />
        <DateRange from={range.from} to={range.to} onChange={setRange} />
        <div className="flex-1" />
        <button onClick={exportHandler} className="rounded-xl border border-neutral-700 px-3 py-2 hover:bg-neutral-800">Export CSV</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total CO₂" value={niceNumber(kpis?.totalCO2, " t")} />
        <KPI label="Avg Carbon Intensity" value={niceNumber(kpis?.avgCI, " g/kWh")} />
        <KPI label="Avg Efficiency" value={niceNumber(kpis?.avgEff, " %")} />
        <KPI label="Avg Renewable Share" value={niceNumber((kpis?.avgRenewable ?? 0)*100, " %")} />
      </div>

      {/* Trend chart */}
      <ChartCard title={`CO₂ Trend ${region ? `– ${region}` : ""}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" minTickGap={24} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Summary by Region */}

      <ChartCard title="CO₂ by Region (top 8)">
        <div style={{ width: '100%', height: 400 }}>
          <RegionCO2Chart summary={summary} />
        </div>
      </ChartCard>
      </Layout>
    </div>
  );
}
