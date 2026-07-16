"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-400">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold">Tune your research environment</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Preferences, defaults, and integrations will appear here as the product expands into a full enterprise workspace.</p>
      </section>
    </div>
  );
}
