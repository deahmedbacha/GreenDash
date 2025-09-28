import { useMemo, useState } from "react";
import ChartCard from "../../components/ChartCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

function niceNumber(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return Math.round(n).toString();
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value;
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/95 px-3 py-2 shadow-xl">
      <div className="text-xs text-neutral-400">Region</div>
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1 text-xs text-neutral-400">Total CO₂</div>
      <div className="text-sm font-semibold">{niceNumber(v)} t</div>
    </div>
  );
}

export default function RegionCO2Chart({ summary }) {
  // summary is expected as: [{ _id: "EU", totalCO2: number }, ...]
  const [topN, setTopN] = useState(8);
  const [unit, setUnit] = useState("t"); // "t" | "Kt" | "Mt"
  const [useLog, setUseLog] = useState(false);

  const unitFactor = unit === "Mt" ? 1e6 : unit === "Kt" ? 1e3 : 1;

  const data = useMemo(() => {
    const base = (summary || [])
      .map((r) => ({
        region: r._id,
        totalCO2: Number(r.totalCO2 || 0),
      }))
      .sort((a, b) => b.totalCO2 - a.totalCO2);
    return base.slice(0, topN).map((d) => ({
      ...d,
      totalCO2Scaled: d.totalCO2 / unitFactor,
    }));
  }, [summary, topN, unitFactor]);

  const formatter = (v) => niceNumber(v) + " " + unit;

  return (
    <ChartCard
      title="CO₂ by Region"
      right={
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Top</span>
          <select
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm"
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            {[5, 8, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <span className="text-xs text-neutral-400 ml-2">Units</span>
          <select
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="t">t</option>
            <option value="Kt">Kt</option>
            <option value="Mt">Mt</option>
          </select>

          <label className="ml-3 text-sm inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useLog}
              onChange={(e) => setUseLog(e.target.checked)}
              className="accent-emerald-500"
            />
            <span className="text-neutral-300">Log scale</span>
          </label>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
          <XAxis
            dataKey="region"
            tick={{ fontSize: 12, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
            height={28}
          />
          <YAxis
            tickFormatter={(v) => niceNumber(v)}
            tick={{ fontSize: 12, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
            width={56}
            scale={useLog ? "log" : "auto"}
            domain={["auto", "auto"]}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<CustomTooltip />}
            formatter={(value) => [formatter(value), "Total CO₂"]}
            labelFormatter={(label) => `Region: ${label}`}
          />

          {/* SVG gradient (no import needed) */}
          <defs>
            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <Bar
            dataKey="totalCO2Scaled"
            fill="url(#barGradient)"
            radius={[10, 10, 10, 10]}
            barSize={24}
            animationDuration={800}
          >
            <LabelList
              dataKey="totalCO2Scaled"
              position="top"
              formatter={(v) => `${niceNumber(v)} ${unit}`}
              className="text-[11px] fill-neutral-300"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
