"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking...");

  const [smiles, setSmiles] = useState("");
  const [target, setTarget] = useState("");
  const [disease, setDisease] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health");
        const data = await response.json();

        if (data.status === "healthy") {
          setBackendStatus("🟢 Connected");
        } else {
          setBackendStatus("🟡 Unknown");
        }
      } catch {
        setBackendStatus("🔴 Offline");
      }
    }

    checkBackend();
  }, []);

const handleAnalyze = async () => {
  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        smiles,
        target,
        disease,
      }),
    });

    const data = await response.json();

    setResult(data);
  } catch (error) {
    console.error(error);
    alert("Backend connection failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div>
            <h1 className="text-3xl font-bold">
              🧬 PatentPilot
            </h1>

            <p className="text-slate-500">
              AI-assisted Patent Discovery & Review Workspace
            </p>
          </div>

          <div className="flex items-center gap-4">

          <a
            href="/history"
            className="rounded-lg bg-slate-800 px-4 py-2 text-white"
          >
            History
          </a>

          <a
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
          Dashboard
          </a>

          <a
          href="/report"
          className="rounded-lg bg-purple-600 px-4 py-2 text-white"
          >
          Report
          </a>

            <div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
            {backendStatus}
            </div>

          </div>

        </div>
      </header>

      {/* Form */}

      <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-white p-10 shadow">

        <h2 className="mb-8 text-3xl font-bold">
          New Patent Analysis
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold">
              SMILES *
            </label>

            <input
              value={smiles}
              onChange={(e) => setSmiles(e.target.value)}
              placeholder="Enter SMILES notation"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Target (Optional)
            </label>

            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Example: EGFR"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Disease (Optional)
            </label>

            <input
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="Example: Lung Cancer"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <button
            onClick={handleAnalyze}
            className="mt-4 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Analyze Patent Landscape
          </button>

          {loading && (
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            Analyzing...
          </div>
          )}

          {result && (
<div className="mt-6 rounded-xl border bg-green-50 p-6">

  <h3 className="text-xl font-bold">
    🧬 AI Patent Analysis Result
  </h3>


  <div className="mt-4 space-y-3">


    <p>
      <strong>SMILES:</strong>{" "}
      {result.data?.[0]?.smiles}
    </p>


    <p>
      <strong>Target:</strong>{" "}
      {result.data?.[0]?.target || "N/A"}
    </p>


    <p>
      <strong>Disease:</strong>{" "}
      {result.data?.[0]?.disease || "N/A"}
    </p>


    <div className="mt-5 rounded-lg bg-white p-4 shadow">

      <p>
        <strong>Novelty Score:</strong>{" "}
        {result.analysis?.novelty_score}%
      </p>


      <p>
        <strong>Risk Level:</strong>{" "}
        <span className="font-bold text-red-600">
          {result.analysis?.risk_level}
        </span>
      </p>

      <div className="mt-4">

      <p>
        <strong>Similarity Score:</strong>{" "}
        {result.analysis?.similarity_score}%
      </p>


      <p>
        <strong>Similarity Result:</strong>{" "}
        {result.analysis?.similarity_result}
      </p>

    </div>

      <p className="mt-3">
        <strong>AI Summary:</strong>
      </p>

      <p className="text-slate-600">
        {result.analysis?.ai_summary}
      </p>

    </div>


  </div>


</div>
)}

        </div>

      </div>

    </main>
  );
}