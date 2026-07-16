"use client";

export default function WorkspacePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">AI Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold">Coordinate review materials and insight threads</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">A premium workspace to track key findings, annotate evidence, and keep cross-functional review moving efficiently.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Current focus</p>
          <p className="mt-3 text-xl font-semibold">Novelty check for lead series</p>
        </div>
        <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Suggested next step</p>
          <p className="mt-3 text-xl font-semibold">Expand family search around the target pathway</p>
        </div>
      </section>
    </div>
  );
}
