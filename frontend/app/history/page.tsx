"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function History() {
  const [analyses, setAnalyses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAnalyses() {
      try {
        const data = await api.analyses();
        setAnalyses(data.data || []);
      } catch {
        setAnalyses([]);
      }
    }

    fetchAnalyses();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">History</p>
            <h1 className="mt-2 text-3xl font-semibold">Analysis timeline</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Review recent submissions and reconstruct the narrative around each prior assessment.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {analyses.length} archived entries
          </div>
        </div>
      </section>

      <div className="space-y-5">
        {analyses.map((item, index) => (
          <div key={`${item.id || index}`} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.created_at ? new Date(item.created_at).toLocaleString() : "Recent submission"}</p>
                <p className="mt-1 text-lg font-semibold">{item.smiles}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">{item.risk_level || "—"}</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-slate-600 dark:text-slate-400">
              <p><span className="font-semibold text-slate-700 dark:text-slate-200">Target:</span> {item.target || "N/A"}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-200">Disease:</span> {item.disease || "N/A"}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-200">Novelty:</span> {item.novelty_score ? `${item.novelty_score}%` : "—"}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.ai_summary || "No summary available yet."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
