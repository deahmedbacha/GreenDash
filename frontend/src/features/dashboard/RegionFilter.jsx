const regions = ["EU","US","APAC","LATAM","MEA"]; // extend if needed

export default function RegionFilter({ value, onChange }) {
  return (
    <select
      className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All regions</option>
      {regions.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}
