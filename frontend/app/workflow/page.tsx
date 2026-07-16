"use client";

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">LangGraph Workflow</p>
        <h1 className="mt-2 text-3xl font-semibold">Trace the review process end to end</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">A structured sequence for intake, retrieval, scoring, and report drafting, designed to make decision-making transparent.</p>
      </section>

      <section className="rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <ol className="space-y-4">
          {[
            "Capture molecule context and review objective",
            "Retrieve and score candidate patents or related families",
            "Generate a risk-oriented summary for expert review",
            "Package report insights and export for stakeholders",
          ].map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{index + 1}</div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
