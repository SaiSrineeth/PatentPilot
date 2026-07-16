"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function Dashboard() {
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
      <section className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-[0_25px_80px_-24px_rgba(15,23,42,0.35)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Overview</p>
            <h1 className="mt-3 text-3xl font-semibold">PatentPilot command center</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Keep a pulse on patent risk, review status, and critical follow-up items from one place.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Active queue</p>
            <p className="mt-1 text-xl font-semibold">{analyses.length} analyses</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total analyses", value: analyses.length, detail: "Stored in the workspace" },
          { label: "Latest risk", value: analyses[0]?.risk_level || "—", detail: "Most recent review state" },
          { label: "Latest target", value: analyses[0]?.target || "N/A", detail: "Most recent molecule target" },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="mb-6 text-2xl font-semibold">Recent analyses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-3 py-3">SMILES</th>
                <th className="px-3 py-3">Target</th>
                <th className="px-3 py-3">Disease</th>
                <th className="px-3 py-3">Risk level</th>
                <th className="px-3 py-3">Novelty</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((item, index) => (
                <tr key={`${item.id || index}`} className="border-b border-slate-100 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300">
                  <td className="px-3 py-3">{item.smiles}</td>
                  <td className="px-3 py-3">{item.target || "N/A"}</td>
                  <td className="px-3 py-3">{item.disease || "N/A"}</td>
                  <td className="px-3 py-3">{item.risk_level || "—"}</td>
                  <td className="px-3 py-3">{item.novelty_score ? `${item.novelty_score}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
