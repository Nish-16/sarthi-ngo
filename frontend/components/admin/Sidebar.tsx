"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Trophy,
  FolderOpen,
  BarChart2,
  UserPlus,
  Newspaper,
  Link2,
  PanelBottom,
  Layers,
  BookOpen,
  AlertCircle,
  GitBranch,
  TrendingUp,
  Home,
  Wrench,
  Info,
  HandHeart,
  ChevronDown,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon };

type PageGroup = {
  id: string;
  label: string;
  pageIcon: LucideIcon;
  previewHref: string;
  items: NavItem[];
  comingSoon?: boolean;
};

const groups: PageGroup[] = [
  {
    id: "home",
    label: "Home Page",
    pageIcon: Home,
    previewHref: "/",
    items: [
      { href: "/admin/hero", label: "Hero", icon: Sparkles },
      { href: "/admin/who-we-are", label: "Who We Are", icon: Users },
      { href: "/admin/recognitions", label: "Recognitions", icon: Trophy },
      { href: "/admin/projects", label: "Featured Projects", icon: FolderOpen },
      { href: "/admin/impact", label: "Impact Stats", icon: BarChart2 },
      { href: "/admin/join-us", label: "Join Us CTA", icon: UserPlus },
      { href: "/admin/stories", label: "Stories & Updates", icon: Newspaper },
    ],
  },
  {
    id: "wwd",
    label: "What We Do",
    pageIcon: Wrench,
    previewHref: "/what-we-do",
    items: [
      { href: "/admin/wwd/hero", label: "Hero", icon: Sparkles },
      {
        href: "/admin/wwd/projects",
        label: "Signature Projects",
        icon: Layers,
      },
      {
        href: "/admin/wwd/previous-projects",
        label: "Previous Projects",
        icon: BookOpen,
      },
      { href: "/admin/wwd/problem", label: "The Problem", icon: AlertCircle },
      { href: "/admin/wwd/approach", label: "Our Approach", icon: GitBranch },
      { href: "/admin/wwd/impact", label: "Impact Numbers", icon: TrendingUp },
    ],
  },
  {
    id: "about",
    label: "About",
    pageIcon: Info,
    previewHref: "/about",
    items: [],
    comingSoon: true,
  },
  {
    id: "team",
    label: "Team",
    pageIcon: Users,
    previewHref: "/team",
    items: [],
    comingSoon: true,
  },
  {
    id: "get-involved",
    label: "Get Involved",
    pageIcon: HandHeart,
    previewHref: "/get-involved",
    items: [
      { href: "/admin/get-involved/hero", label: "Hero", icon: Sparkles },
      {
        href: "/admin/get-involved/involvement-grid",
        label: "Ways to Join",
        icon: Layers,
      },
      { href: "/admin/get-involved/why-join", label: "Why Join", icon: Users },
      {
        href: "/admin/get-involved/testimonials",
        label: "Testimonials",
        icon: Newspaper,
      },
      {
        href: "/admin/get-involved/stats",
        label: "Impact Stats",
        icon: BarChart2,
      },
      {
        href: "/admin/get-involved/volunteer",
        label: "Volunteer",
        icon: UserPlus,
      },
      { href: "/admin/get-involved/intern", label: "Intern", icon: BookOpen },
      {
        href: "/admin/get-involved/collaborate",
        label: "Collaborate",
        icon: Link2,
      },
    ],
  },
  {
    id: "global",
    label: "Global Elements",
    pageIcon: Globe,
    previewHref: "/",
    items: [
      { href: "/admin/navbar", label: "Navbar", icon: Link2 },
      { href: "/admin/footer", label: "Footer", icon: PanelBottom },
    ],
  },
];

// Build a path→groupId map for auto-expanding
const pathToGroup = new Map<string, string>();
for (const g of groups) {
  for (const item of g.items) {
    pathToGroup.set(item.href, g.id);
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  const activeGroupId = pathToGroup.get(pathname) ?? "home";

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set([activeGroupId]),
  );

  // When navigating, make sure the active group is open
  useEffect(() => {
    const gid = pathToGroup.get(pathname);
    if (gid) {
      setOpenGroups((prev) => {
        if (prev.has(gid)) return prev;
        return new Set([...prev, gid]);
      });
    }
  }, [pathname]);

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-100">
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

      {/* Accordion nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => {
          const isOpen = openGroups.has(group.id);
          const GroupIcon = group.pageIcon;
          const hasActive = group.items.some((i) => i.href === pathname);

          return (
            <div key={group.id}>
              {/* Group header */}
              <button
                onClick={() => !group.comingSoon && toggleGroup(group.id)}
                disabled={group.comingSoon}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${
                  group.comingSoon
                    ? "opacity-40 cursor-default"
                    : hasActive
                      ? "text-indigo-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    hasActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <GroupIcon className="w-3.5 h-3.5" />
                </span>
                <span className="flex-1 text-sm font-semibold truncate">
                  {group.label}
                </span>
                {group.comingSoon ? (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full shrink-0">
                    Soon
                  </span>
                ) : (
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    } ${hasActive ? "text-indigo-500" : "text-slate-400"}`}
                  />
                )}
              </button>

              {/* Section items */}
              {isOpen && !group.comingSoon && group.items.length > 0 && (
                <ul className="pb-1 px-3">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                            isActive
                              ? "bg-indigo-50 text-indigo-700 font-semibold"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium"
                          }`}
                        >
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-indigo-500" : "text-slate-400"}`}
                          />
                          <span className="truncate">{item.label}</span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Subtle divider between groups */}
              <div className="mx-4 border-b border-slate-100" />
            </div>
          );
        })}
      </nav>

      {/* Preview link */}
      <div className="px-4 py-3 border-t border-slate-100">
        <a
          href={activeGroup?.previewHref ?? "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors px-2 py-1.5 rounded-lg hover:bg-indigo-50"
        >
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="truncate">
            Preview {activeGroup?.label ?? "Website"}
          </span>
        </a>
      </div>
    </aside>
  );
}
