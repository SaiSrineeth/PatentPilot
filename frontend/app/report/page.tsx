"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Report() {

  const [report, setReport] = useState<any>(null);


  useEffect(() => {

    async function fetchLatestReport(){

      const response = await fetch(
        "http://127.0.0.1:8000/analyses"
      );

      const data = await response.json();


      if(data.data.length > 0){
        setReport(data.data[0]);
      }

    }


    fetchLatestReport();

  }, []);

  function downloadPDF(){

  if(!report) return;


  const pdf = new jsPDF();


  pdf.setFontSize(16);

  pdf.text(
    "PatentPilot AI Analysis Report",
    20,
    20
  );


  pdf.setFontSize(11);


  const text = report.ai_report;


  const lines = pdf.splitTextToSize(
    text,
    170
  );


  pdf.text(
    lines,
    20,
    40
  );


  pdf.save(
    "PatentPilot_Report.pdf"
  );

}


  return (

    <main className="min-h-screen bg-slate-100 p-10">


      <h1 className="text-4xl font-bold mb-8">
        📄 PatentPilot AI Report
      </h1>

      <button
    onClick={downloadPDF}
    className="mb-6 rounded-lg bg-purple-600 px-6 py-3 text-white"
    >
    Download PDF
    </button>


      {report && (

        <div className="rounded-xl bg-white p-8 shadow">


          <h2 className="text-2xl font-bold mb-5">
            Analysis Report
          </h2>


          <pre className="whitespace-pre-wrap text-slate-700">
            {report.ai_report}
          </pre>


        </div>

      )}


    </main>

  );

}