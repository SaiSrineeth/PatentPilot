"use client";

import { AuthPanel } from "@/components/AuthPanel";

export default function LoginPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">PatentPilot</h1>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <AuthPanel />
      </div>
    </div>
  );
}
