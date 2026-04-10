import Image from "next/image";
import Link from "next/link";
import { Sparkles, Star } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { HeroContent } from "@/types/content";

export default function Hero({ content }: { content: HeroContent }) {
  const stats = content.stats?.length
    ? content.stats
    : [
        { value: "500+", label: "Active Members" },
        { value: "12",   label: "Cities" },
        { value: "98%",  label: "Impact Score" },
      ];

  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-indigo-50/50 min-h-screen lg:h-screen">

      {/* ── Ambient blobs ── */}
      <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-orange-200/30 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-indigo-200/30 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-100/20 blur-[140px] pointer-events-none" />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10 w-full py-28 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ══════════════ LEFT: text ══════════════ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5">

            {/* Mobile logo */}
            <div className="relative flex lg:hidden justify-center mb-2"
              style={{ animation: "fade-up 0.5s ease forwards" }}>
              <div className="absolute inset-0 scale-150 rounded-full bg-orange-300/25 blur-2xl animate-pulse-glow" />
              <Image
                src="/sarthi-logo.png" alt="Yuva Sarthi"
                width={120} height={120}
                className="relative z-10 w-28 h-28 drop-shadow-xl"
                priority
              />
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide opacity-0 animate-fade-up"
              style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {content.badge}
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight max-w-xl lg:max-w-none opacity-0 animate-fade-up"
              style={{ animationDelay: "0.18s", animationFillMode: "forwards" }}
            >
              {content.headline}{" "}
              <span className="text-orange-500">
                {content.headlineAccent}
              </span>
              {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 animate-gradient-x">
                {content.headlineEnd}
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg opacity-0 animate-fade-up"
              style={{ animationDelay: "0.32s", animationFillMode: "forwards" }}
            >
              {content.subtext}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
            >
              <Button variant="primary" size="lg" href="/get-involved">
                <span>{content.ctaPrimary}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 px-7 py-3.5 text-base border-2 border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
              >
                {content.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4 pt-5 mt-1 border-t border-slate-200 w-full max-w-lg opacity-0 animate-fade-up"
              style={{ animationDelay: "0.58s", animationFillMode: "forwards" }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-2xl font-black text-indigo-600 leading-none">{stat.value}</span>
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT: visual ══════════════ */}
          <div className="hidden lg:flex items-center justify-center relative h-[520px]">

            {/* Organic background shape */}
            <div
              className="absolute inset-8 opacity-80"
              style={{
                background: "radial-gradient(ellipse at 40% 40%, #fed7aa55, #e0e7ff44, transparent 70%)",
                borderRadius: "42% 58% 55% 45% / 48% 42% 58% 52%",
              }}
            />

            {/* Corner dot grids */}
            <div className="absolute top-3 left-6 w-28 h-28 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle,#6366f1 1.5px,transparent 1.5px)", backgroundSize: "10px 10px" }} />
            <div className="absolute bottom-3 right-5 w-24 h-24 opacity-15 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle,#f97316 1.5px,transparent 1.5px)", backgroundSize: "10px 10px" }} />

            {/* Floating accent shapes */}
            <div className="absolute top-8  right-14 w-10 h-10 rounded-full border-2 border-orange-300/50 animate-float-slow" />
            <div className="absolute bottom-12 left-8  w-6  h-6  rounded-full bg-indigo-200/70  animate-float" />
            <div className="absolute top-1/3 left-5  w-4  h-4  rounded-full bg-orange-300/70  animate-float-slow" />
            <div className="absolute bottom-24 right-16 w-5 h-5 rounded-full border border-violet-300/60 animate-float" />

            <Sparkles className="absolute top-10  left-1/3  w-5 h-5 text-orange-400/55 animate-float" />
            <Sparkles className="absolute bottom-14 right-1/3 w-4 h-4 text-indigo-400/45 animate-float-slow" />
            <Star     className="absolute top-1/3  right-10  w-3 h-3 text-amber-400/50  animate-float" />
            <Star     className="absolute bottom-1/3 left-12  w-3 h-3 text-violet-400/40 animate-float-slow" />

            {/* ── Ring system (centered) ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">

              {/* Ring 1 — outer dashed orange, 22s CW */}
              <div className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-orange-300/35 animate-spin-slow pointer-events-none">
                {/* Orbiting dot */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-orange-400/80 shadow-md shadow-orange-300/50" />
              </div>

              {/* Ring 2 — middle solid indigo, 30s CCW */}
              <div className="absolute w-[240px] h-[240px] rounded-full border border-indigo-200/50 animate-spin-slow-reverse pointer-events-none">
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-indigo-400/70 shadow-sm shadow-indigo-300/40" />
              </div>

              {/* Ring 3 — inner dashed amber, 14s CW */}
              <div className="absolute w-[172px] h-[172px] rounded-full border-2 border-dashed border-amber-300/45 animate-spin-fast pointer-events-none">
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400/80" />
              </div>

              {/* Logo glow */}
              <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-orange-200/60 to-amber-100/40 blur-2xl animate-pulse-glow pointer-events-none" />

              {/* Logo */}
              <Image
                src="/sarthi-logo.png" alt="Yuva Sarthi"
                width={192} height={192}
                className="relative z-10 w-44 h-44 drop-shadow-2xl"
                priority
              />
            </div>

          </div>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
