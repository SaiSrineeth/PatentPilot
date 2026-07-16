"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function persistSession(emailValue: string, provider: "email" | "google") {
    const profile = {
      email: emailValue,
      name: emailValue.split("@")[0] || "Researcher",
      provider,
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem("patentpilot-auth", JSON.stringify(profile));
  }

  function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Please enter both your email and password.");
      return;
    }

    persistSession(email, "email");
    setMessage(mode === "signup" ? "Account ready. You are signed in." : "Welcome back.");
    router.push("/");
  }

  function handleGoogle() {
    const googleEmail = email || "researcher@gmail.com";
    persistSession(googleEmail, "google");
    router.push("/");
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[36px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_24px_90px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-400">Secure access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Sign in to PatentPilot</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Access your patent review workspace, save analyses, and continue your FTO workflows with a protected account.
        </p>
      </div>

      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-700 dark:bg-slate-800/80">
        <div className="mb-4 flex rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
          <button onClick={() => setMode("signin")} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-slate-900 text-white" : "text-slate-600 dark:text-slate-300"}`}>
            Sign in
          </button>
          <button onClick={() => setMode("signup")} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-slate-900 text-white" : "text-slate-600 dark:text-slate-300"}`}>
            Create account
          </button>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40" />
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 dark:focus-visible:ring-sky-300/70 dark:active:bg-sky-600">
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span>or</span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <button onClick={handleGoogle} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700 dark:focus-visible:ring-sky-300/70">
          Continue with Google
        </button>

        {message ? <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message}</p> : null}
      </div>
    </div>
  );
}
