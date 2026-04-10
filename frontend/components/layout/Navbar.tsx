"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { NavbarContent } from "@/types/content";

export default function Navbar({ content }: { content: NavbarContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-orange-50/90 via-white/85 to-indigo-50/80 backdrop-blur-md border-b border-white/20">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20 py-2 md:py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/sarthi-logo.png"
              alt={content.logoText}
              width={120}
              height={40}
              className="h-10 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Links */}
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

          {/* CTA */}
          <div className="hidden md:block">
            <Button size="sm" href={content.ctaHref}>
              {content.ctaLabel}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100/60 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/30 backdrop-blur-md">
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