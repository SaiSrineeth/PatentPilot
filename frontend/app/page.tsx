"use client";

import { useEffect, useState } from "react";
import AnalysisForm from "@/components/AnalysisForm";
import { api } from "@/services/api";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("patentpilot-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("patentpilot-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function checkBackend() {
      try {
        const data = await api.health();
        setBackendStatus(data.status === "healthy" ? "🟢 Connected" : "🟡 Unknown");
      } catch {
        setBackendStatus("🔴 Offline");
      }
    }

    checkBackend();
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(241,245,249,0.98))] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_32%),linear-gradient(180deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.97))] dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/75">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl shadow-lg shadow-blue-500/20">🧬</div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">PatentPilot</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">AI-assisted Patent Discovery & Review Workspace</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="rounded-2xl border border-slate-300 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <a href="/history" className="rounded-2xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">History</a>
            <a href="/dashboard" className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">Dashboard</a>
            <a href="/report" className="rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700">Report</a>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">{backendStatus}</div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-[0_25px_80px_-20px_rgba(79,70,229,0.45)] dark:border-slate-800">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Freedom-to-operate workspace</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Assess patent overlap with confidence</h2>
              <p className="mt-4 text-base leading-8 text-blue-50">
                PatentPilot combines a lightweight retrieval workflow with an AI-generated summary so researchers can scan likely overlaps quickly and decide whether a molecule needs deeper legal review.
              </p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl">
              <p className="text-sm font-semibold text-blue-100">Recommended workflow</p>
              <p className="mt-2 text-xl font-semibold">Submit • Review • Report</p>
            </div>
          </div>
        </div>

        <AnalysisForm />
      </section>
    </main>
  );
}