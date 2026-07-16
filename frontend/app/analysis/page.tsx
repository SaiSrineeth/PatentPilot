"use client";

import AnalysisForm from "@/components/AnalysisForm";

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">New Analysis</p>
        <h1 className="mt-2 text-3xl font-semibold">Launch a new FTO review</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Submit a molecule, target, and disease context to begin the analysis workflow with the same backend intelligence as the main workspace.</p>
      </section>
      <AnalysisForm />
    </div>
  );
}
