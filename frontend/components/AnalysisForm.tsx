"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function AnalysisForm() {
  const [smiles, setSmiles] = useState("");
  const [target, setTarget] = useState("");
  const [disease, setDisease] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!smiles.trim()) {
      setError("Please enter a SMILES string.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.analyze({ smiles, target, disease });
      setResult(response);
    } catch (err: any) {
      setError(err.message || "The analysis request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200/70 bg-white/85 p-8 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">New analysis</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Submit a molecule for rapid FTO screening</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              The workflow uses keyword, structural, and contextual signals to surface likely patent overlaps and summarize them in a concise report.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            Suggested: EGFR • Lung cancer
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            SMILES *
            <input
              value={smiles}
              onChange={(e) => setSmiles(e.target.value)}
              placeholder="e.g. CC(=O)O"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          <label className="block rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            Target (optional)
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. EGFR"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          <label className="block rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm font-semibold text-slate-700 shadow-sm lg:col-span-2 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            Disease / indication (optional)
            <input
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="e.g. non-small cell lung cancer"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Analyzing..." : "Analyze patent landscape"}
          </button>
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            Fast, explainable review workflow
          </div>
        </div>

        {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p> : null}
      </div>

      {result ? (
        <div className="rounded-[32px] border border-emerald-200/70 bg-emerald-50/80 p-8 shadow-[0_30px_80px_-24px_rgba(16,185,129,0.35)] backdrop-blur-2xl dark:border-emerald-800 dark:bg-emerald-950/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">Analysis complete</p>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">AI-assisted FTO assessment</h3>
            </div>
            <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-emerald-700 shadow-sm dark:bg-slate-900/70 dark:text-emerald-300">
              {result.analysis?.risk_level || "Pending"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Novelty score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{result.analysis?.novelty_score ?? 0}%</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Similarity score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{result.analysis?.similarity_score ?? 0}%</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">AI summary</p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-400">{result.analysis?.ai_summary}</p>
          </div>

          <div className="mt-6 rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950/70 dark:ring-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Suggested patent matches</p>
            <div className="mt-4 space-y-3">
              {(result.analysis?.patents || []).map((patent: any, index: number) => (
                <div key={`${patent.patent_number}-${index}`} className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-400 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900 dark:text-white">{patent.title}</p>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">{patent.relevance_score}%</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{patent.abstract}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{patent.patent_number} • {patent.assignee} • {patent.publication_date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
