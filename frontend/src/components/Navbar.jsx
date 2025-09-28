import logo from "../../../greendash2.png"; // adjust path if needed

export default function Navbar({ onExport }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-neutral-800 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-3">
  {/* Logo + Brand */}
  <div className="flex items-center gap-2">
    <img
  src={logo}
  alt="GreenDash Logo"
  className="w-16 h-16 object-contain"
  style={{ imageRendering: "crisp-edges" }} // optional for pixel art logos
/>

    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
      GreenDash
    </span>
  </div>

  {/* Push Export to the right */}
  <div className="flex-1" />

  <button
    onClick={onExport}
    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500 px-4 py-2 text-emerald-400 hover:bg-emerald-500/10 transition"
    title="Export CSV"
  >
    Export
  </button>
</div>

    </header>
  );
}
