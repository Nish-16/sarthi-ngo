"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { NavbarContent } from "@/types/content";

export default function Navbar({ content }: { content: NavbarContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-18 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              {content.logoText.charAt(0)}
            </span>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              {content.logoText}
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {content.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-indigo-700 bg-indigo-100"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button size="sm" href={content.ctaHref}>
              {content.ctaLabel}
            </Button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100">
            <ul className="flex flex-col gap-1 pt-3">
              {content.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname === link.href
                        ? "text-indigo-700 bg-indigo-100"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button size="sm" className="w-full" href={content.ctaHref}>
                  {content.ctaLabel}
                </Button>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
