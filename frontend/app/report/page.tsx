"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { api } from "@/services/api";

export default function Report() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    async function fetchLatestReport() {
      try {
        const data = await api.analyses();
        if ((data.data || []).length > 0) {
          setReport(data.data[0]);
        }
      } catch {
        setReport(null);
      }
    }

    fetchLatestReport();
  }, []);

  function downloadPDF() {
    if (!report) return;

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("PatentPilot AI Analysis Report", 20, 20);
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(report.ai_report || "No report available.", 170);
    pdf.text(lines, 20, 40);
    pdf.save("PatentPilot_Report.pdf");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">Report</p>
            <h1 className="mt-2 text-3xl font-semibold">Executive patent report</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Generate a polished narrative summarizing the latest analysis for legal review and stakeholder sharing.</p>
          </div>
          <button onClick={downloadPDF} className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">Download PDF</button>
        </div>
      </section>

      {report ? (
        <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="border-b border-slate-200 bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-8 text-white dark:border-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-100">Latest analysis</p>
            <h2 className="mt-2 text-2xl font-semibold">FTO report snapshot</h2>
            <p className="mt-2 text-sm text-violet-100">{report.smiles || "Submitted molecule"}</p>
          </div>
          <div className="p-8">
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm text-slate-500 dark:text-slate-400">Risk level</p>
                <p className="mt-2 text-xl font-semibold">{report.risk_level || "—"}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm text-slate-500 dark:text-slate-400">Novelty score</p>
                <p className="mt-2 text-xl font-semibold">{report.novelty_score ? `${report.novelty_score}%` : "—"}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm text-slate-500 dark:text-slate-400">Similarity</p>
                <p className="mt-2 text-xl font-semibold">{report.similarity_score ? `${report.similarity_score}%` : "—"}</p>
              </div>
            </div>
            <pre className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-6 text-sm leading-8 text-slate-100">{report.ai_report}</pre>
          </div>
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-8 text-slate-600 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">No report has been generated yet. Run a new analysis from the workspace first.</div>
      )}
    </div>
  );
}
