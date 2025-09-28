import React from "react";
import { motion } from "framer-motion";
import logo from "../../../../greendash2.png"; // adjust path if needed

/**
 * Wärtsilä Sustainability Intelligence Platform — Overview
 * Drop this file into src/pages/Overview.jsx (or /components) and route to it.
 * TailwindCSS recommended but not required; classes degrade gracefully.
 */

export default function Overview() {
  const bullets = [
    {
      title: "Single Source of Truth",
      body:
        "Unifies sustainability, operations, and finance data to expose what actually moves the net‑zero needle.",
    },
    {
      title: "Actionable Insights",
      body:
        "Turns raw telemetry into prioritized, dollar‑tagged decarbonization actions ranked by ROI and CO₂e impact.",
    },
    {
      title: "Near Real‑Time View",
      body:
        "Streams key metrics (CO₂e, energy, utilization) from assets and ERPs to a live command view.",
    },
    {
      title: "Trust & Traceability",
      body:
        "Evidence trails for every number: source → transformation → assumption → audit, exportable to CSRD/CDP.",
    },
  ];

  const kpis = [
    { label: "CO₂e avoided", value: "— tCO₂e", note: "live calc per asset & portfolio" },
    { label: "ROI", value: "> 18%", note: "weighted across actions" },
    { label: "Payback", value: "< 24 mo", note: "target for top actions" },
    { label: "Data freshness", value: "≤ 15 min", note: "streaming telemetry" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="GreenDash Logo"
            className="w-16 h-16 object-contain"
            style={{ imageRendering: "crisp-edges" }} // optional for pixel art logos
          />
          <span className="text-lg font-semibold tracking-tight">GreenDash</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a className="hover:text-cyan-300" href="#solution">Solution</a>
          <a className="hover:text-cyan-300" href="#features">Features</a>
          <a className="hover:text-cyan-300" href="#architecture">Architecture</a>
          <a className="hover:text-cyan-300" href="#kpis">KPIs</a>
          <a className="hover:text-cyan-300" href="#roadmap">Roadmap</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_60%_90%,rgba(16,185,129,0.12),transparent_38%)]" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            Wärtsilä — GreenDash Platform
          </motion.h1>
          <p className="mt-6 max-w-2xl text-slate-300">
            A pragmatic, real‑time view that reveals what matters and points the way to net zero: unify
            siloed data, quantify impact, and recommend the next best action across fleets, plants, and sites.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="http://localhost:5173/dashboard"
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-slate-900 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300"
            >
              Try Demo
            </a>
            <a
              href="#docs"
              className="rounded-2xl border border-slate-700 px-5 py-3 hover:border-slate-500 hover:bg-slate-900/40"
            >
              Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section id="solution" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="text-xl font-semibold">The Problem</h3>
            <p className="mt-3 text-slate-300">
              Sustainability data is scattered across ERPs, EMS, data historians, manual reports, and vendor portals.
              Teams spend weeks reconciling spreadsheets, yet leaders still lack a trustworthy view of CO₂e,
              energy, and cost trade‑offs—especially for real‑time operational decisions.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="text-xl font-semibold">Our Solution</h3>
            <p className="mt-3 text-slate-300">
              We ingest, standardize, and reconcile operational and sustainability data into a
              verifiable model, then run an optimization layer that ranks actions by measured
              impact and business value. Evidence trails back every metric to its source for audit and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h3 className="text-2xl font-semibold">Key Features</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bullets.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
            >
              <div className="mb-3 h-8 w-8 rounded-lg bg-cyan-400/20 ring-1 ring-cyan-400/30" />
              <h4 className="font-semibold">{b.title}</h4>
              <p className="mt-2 text-sm text-slate-300">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">Architecture (hackathon build)</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
              <li>Ingest: MQTT/HTTP for telemetry, CSV/Excel for legacy; batch + stream via simple connectors.</li>
              <li>Storage: time‑series (Open‑Source TSDB) + Postgres for entity & evidence graph.</li>
              <li>Model: emission factors + normalization + reconciliation rules (dbt‑style lineage).</li>
              <li>Optimization: greedy + knapSack baseline producing ranked actions with ROI & CO₂e deltas.</li>
              <li>API: GraphQL/REST serving live metrics and recommended actions.</li>
              <li>App: React + Vite + Tailwind; role‑based views for Ops, Sustainability, Finance.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
            {/* Lightweight diagram */}
            <svg viewBox="0 0 680 360" className="h-full w-full">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <rect x="10" y="20" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="110" y="66" textAnchor="middle" fontSize="14" fill="#e2e8f0">Ingest</text>

              <rect x="240" y="20" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="340" y="66" textAnchor="middle" fontSize="14" fill="#e2e8f0">Storage</text>

              <rect x="470" y="20" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="570" y="66" textAnchor="middle" fontSize="14" fill="#e2e8f0">Model & Lineage</text>

              <rect x="240" y="140" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="340" y="186" textAnchor="middle" fontSize="14" fill="#e2e8f0">Optimization</text>

              <rect x="10" y="260" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="110" y="306" textAnchor="middle" fontSize="14" fill="#e2e8f0">API (REST/GraphQL)</text>

              <rect x="240" y="260" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="340" y="306" textAnchor="middle" fontSize="14" fill="#e2e8f0">App (React)</text>

              <rect x="470" y="260" width="200" height="80" rx="16" fill="url(#g)" stroke="#164e63" />
              <text x="570" y="306" textAnchor="middle" fontSize="14" fill="#e2e8f0">Exports (CSRD/CDP)</text>

              {/* Arrows */}
              <g stroke="#334155" strokeWidth="2" fill="none">
                <path d="M210 60 H240" />
                <path d="M440 60 H470" />
                <path d="M340 100 V140" />
                <path d="M340 220 V260" />
                <path d="M210 300 H240" />
                <path d="M440 300 H470" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section id="kpis" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h3 className="text-2xl font-semibold">Operational KPIs</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
              <div className="text-3xl font-semibold tracking-tight">{k.value}</div>
              <div className="mt-1 text-sm text-slate-300">{k.label}</div>
              <div className="mt-3 text-xs text-slate-400">{k.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h3 className="text-2xl font-semibold">Security & Data Governance</h3>
        <p className="mt-3 max-w-4xl text-slate-300">
          Role‑based access, row‑level security, signed evidence objects, and reproducible transforms.
          Pseudonymization for sensitive operational data with granular retention controls. Everything exportable
          with line‑by‑line provenance for audits.
        </p>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <h3 className="text-2xl font-semibold">Roadmap (next 2–6 weeks)</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-300">
          <li>Expand connectors (OPC‑UA, Modbus, SAP extract) and automate factor updates.</li>
          <li>Add scenario planner with budget constraints and risk weights.</li>
          <li>Improve optimization with mixed‑integer programming baseline.</li>
          <li>Publish API spec + evidence export bundles for auditors.</li>
          <li>Pilot with sample plant/fleet; validate savings vs. control group.</li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-16 text-sm text-slate-400">
        Built at JunctionX Vaasa 2025 for Wärtsilä with Love. Team: ChilliFuksi. Contact: ChilliFuksi@gmail.com
      </footer>
    </div>
  );
}
