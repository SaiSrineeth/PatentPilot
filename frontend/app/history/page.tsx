"use client";

import { useEffect, useState } from "react";

export default function History() {

  const [analyses, setAnalyses] = useState<any[]>([]);

  useEffect(() => {

    async function fetchAnalyses(){

      const response = await fetch(
        "http://127.0.0.1:8000/analyses"
      );

      const data = await response.json();

      setAnalyses(data.data);

    }

    fetchAnalyses();

  }, []);


  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        📋 Analysis History
      </h1>


      <div className="space-y-5">

      {analyses.map((item,index)=>(

        <div
          key={index}
          className="rounded-xl bg-white p-6 shadow"
        >

          <p>
            <b>SMILES:</b> {item.smiles}
          </p>

          <p>
            <b>Target:</b> {item.target || "N/A"}
          </p>

          <p>
            <b>Disease:</b> {item.disease || "N/A"}
          </p>

          <p>
            <b>Status:</b> {item.status}
          </p>

        </div>

      ))}

      </div>

    </main>
  );
}