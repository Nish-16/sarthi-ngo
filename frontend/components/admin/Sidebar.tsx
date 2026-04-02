"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin/hero", label: "Hero", icon: "✦" },
  { href: "/admin/who-we-are", label: "Who We Are", icon: "👥" },
  { href: "/admin/recognitions", label: "Recognitions", icon: "🏆" },
  { href: "/admin/projects", label: "Featured Projects", icon: "📂" },
  { href: "/admin/impact", label: "Impact Stats", icon: "📊" },
  { href: "/admin/join-us", label: "Join Us CTA", icon: "🙋" },
  { href: "/admin/stories", label: "Stories & Updates", icon: "📰" },
  { href: "/admin/navbar", label: "Navbar", icon: "🔗" },
  { href: "/admin/footer", label: "Footer", icon: "⬇" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30">
            S
          </span>
          <div>
            <p className="text-sm font-black text-slate-900">Sarthi Admin</p>
            <p className="text-xs text-slate-400">Content Manager</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
          Sections
        </p>
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Preview link */}
      <div className="px-4 py-4 border-t border-slate-100">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors px-2 py-1.5 rounded-lg hover:bg-indigo-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Preview Website
        </a>
      </div>
    </aside>
  );
}
