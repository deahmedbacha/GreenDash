export default function ChartCard({ title, children, right }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex-1" />
        {right}
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
}
