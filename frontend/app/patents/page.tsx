"use client";

export default function PatentsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">Patent Search</p>
        <h1 className="mt-2 text-3xl font-semibold">Search and prioritize likely overlaps</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">This surface is designed for rapid review of likely families, citation clusters, and publication signals before a deeper legal assessment.</p>
      </section>

      <section className="rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/70">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Query</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200" placeholder="Enter target, compound, or keyword" />
            <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
}
