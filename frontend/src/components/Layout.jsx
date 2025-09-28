import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, onExport }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onExport={onExport} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
