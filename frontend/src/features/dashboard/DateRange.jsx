export default function DateRange({ from, to, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2"
        value={from || ""}
        onChange={e => onChange({ from: e.target.value || null, to })}
      />
      <span className="text-neutral-500">→</span>
      <input
        type="date"
        className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2"
        value={to || ""}
        onChange={e => onChange({ from, to: e.target.value || null })}
      />
    </div>
  );
}
