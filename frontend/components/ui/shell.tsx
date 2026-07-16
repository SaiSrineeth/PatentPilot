"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { FileText, History, LayoutDashboard, Menu, Settings, SquarePen, X, ChevronLeft, ChevronRight, BookOpen, LifeBuoy, ShieldCheck } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analysis", label: "New Analysis", icon: SquarePen },
  { href: "/patents", label: "Patent Search", icon: FileText },
  { href: "/report", label: "Patent Reports", icon: FileText },
  { href: "/history", label: "History", icon: History },
  { href: "/saved", label: "Saved Analyses", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/docs", label: "Documentation", icon: BookOpen },
  { href: "/help", label: "Help", icon: LifeBuoy },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("patentpilot-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("patentpilot-theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = window.localStorage.getItem("patentpilot-auth");
    setAuthed(Boolean(stored));
  }, [pathname]);

  function logout() {
    window.localStorage.removeItem("patentpilot-auth");
    setAuthed(false);
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.09),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(241,245,249,0.98))] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.14),_transparent_32%),linear-gradient(180deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.97))] dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200/70 bg-white/80 backdrop-blur-2xl transition-all duration-300 md:flex ${collapsed ? "w-24" : "w-72"} flex-col dark:border-slate-800 dark:bg-slate-950/80`}>
          <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-5 dark:border-slate-800">
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-lg shadow-lg shadow-indigo-500/20">🧬</div>
              {!collapsed && <div><p className="font-semibold">PatentPilot</p><p className="text-xs text-slate-500 dark:text-slate-400">AI FTO Workspace</p></div>}
            </div>
            <button onClick={() => setCollapsed((prev) => !prev)} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${active ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-slate-100 dark:text-slate-900" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
                  <Icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200/70 p-4 dark:border-slate-800">
            <div className={`rounded-3xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/70 ${collapsed ? "flex justify-center" : ""}`}>
              {!collapsed ? (
                <div>
                  <p className="text-sm font-semibold">Protected workspace</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sign in to continue</p>
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-semibold text-white">P</div>
              )}
            </div>
          </div>
        </aside>

        <div className={`flex-1 transition-all duration-300 ${collapsed ? "md:ml-24" : "md:ml-72"}`}>
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileOpen(true)} className="rounded-2xl border border-slate-200 p-2.5 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300">
                  <Menu size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">{theme === "light" ? "🌙" : "☀️"}</button>
                {authed ? (
                  <button onClick={logout} className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">Logout</button>
                ) : (
                  <Link href="/login" className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">Login</Link>
                )}
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">{pathname === "/login" ? children : <AuthGate>{children}</AuthGate>}</main>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/50 md:hidden">
          <div className="h-full w-72 border-r border-slate-800 bg-slate-950/95 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between px-2 py-2">
              <p className="font-semibold text-white">PatentPilot</p>
              <button onClick={() => setMobileOpen(false)} className="rounded-xl border border-slate-800 p-2 text-slate-300">
                <X size={16} />
              </button>
            </div>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium ${active ? "bg-white text-slate-900" : "text-slate-300 hover:bg-slate-900"}`}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
