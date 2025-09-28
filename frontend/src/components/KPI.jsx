export default function KPI({ label, value, sub }) {
  return (
    <div className="card p-4">
      <div className="text-neutral-400 text-xs uppercase">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {sub && <div className="text-neutral-400 text-xs mt-1">{sub}</div>}
    </div>
  );
}
