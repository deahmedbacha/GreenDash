import { Gauge, BarChart3, Layers } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 border-r border-neutral-800 bg-neutral-950/50">
      <nav className="p-4 space-y-1">
        <div className="text-xs uppercase text-neutral-400 px-2 mb-2">Overview</div>
        <a className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-900 transition cursor-default">
          <Gauge className="w-4 h-4" /> Dashboard
        </a>
        <a className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-900 transition cursor-default">
          <BarChart3 className="w-4 h-4" /> Trends
        </a>
        <a className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-900 transition cursor-default">
          <Layers className="w-4 h-4" /> Compliance
        </a>
      </nav>
    </aside>
  );
}
