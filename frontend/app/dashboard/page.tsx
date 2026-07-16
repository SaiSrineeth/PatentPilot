"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [analyses, setAnalyses] = useState<any[]>([]);

  useEffect(() => {

    async function fetchAnalyses() {

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


      <h1 className="text-4xl font-bold mb-10">
        📊 PatentPilot Dashboard
      </h1>


      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-slate-500">
            Total Analyses
          </h2>

          <p className="text-4xl font-bold mt-3">
            {analyses.length}
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-slate-500">
            Status
          </h2>

          <p className="text-4xl font-bold mt-3">
            Submitted
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-slate-500">
            Latest Analysis
          </h2>

          <p className="text-xl font-bold mt-3">
            {analyses[0]?.target || "N/A"}
          </p>

        </div>


      </div>



      {/* Recent Table */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold mb-6">
          Recent Analyses
        </h2>


        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-3">
                SMILES
              </th>

              <th className="text-left p-3">
                Target
              </th>

              <th className="text-left p-3">
                Disease
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

          {analyses.map((item,index)=>(

            <tr key={index} className="border-b">

              <td className="p-3">
                {item.smiles}
              </td>

              <td className="p-3">
                {item.target || "N/A"}
              </td>

              <td className="p-3">
                {item.disease || "N/A"}
              </td>

              <td className="p-3">
                {item.status}
              </td>

            </tr>

          ))}

          </tbody>

        </table>


      </div>


    </main>

  );
}