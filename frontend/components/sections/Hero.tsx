import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, TrendingUp, Sparkles } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { HeroContent } from "@/types/content";

const CARD_ICONS = [Users, MapPin, TrendingUp];

const CARD_POSITIONS = [
  "top-6 left-0 animate-float",
  "bottom-10 right-0 animate-float-slow",
  "top-1/2 -translate-y-1/2 right-0 animate-float",
] as const;

export default function Hero({ content }: { content: HeroContent }) {
  const stats = content.stats?.length
    ? content.stats
    : [
        { value: "500+", label: "Active Members" },
        { value: "12", label: "Cities" },
        { value: "98%", label: "Impact Score" },
      ];

  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-indigo-50/50 min-h-screen lg:h-screen">
      {/* ── Background blobs ── */}
      <div className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full bg-orange-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-indigo-200/30 blur-[100px] pointer-events-none" />

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10 w-full py-28 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ════ LEFT: text ════ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 animate-fade-up">

            {/* Mobile-only logo */}
            <div className="relative flex lg:hidden justify-center mb-2">
              <div className="absolute inset-0 scale-150 rounded-full bg-orange-300/20 blur-2xl" />
              <Image
                src="/sarthi-logo.png"
                alt="Yuva Sarthi"
                width={120}
                height={120}
                className="relative z-10 w-28 h-28 drop-shadow-xl"
                priority
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {content.badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight max-w-xl lg:max-w-none">
              {content.headline}{" "}
              <span className="relative inline-block text-orange-500">
                {content.headlineAccent}
                {/* Underline squiggle */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 120 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6 C20 2, 40 7, 60 4 C80 1, 100 6, 118 3"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>
              {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                {content.headlineEnd}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg">
              {content.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
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

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4 pt-5 mt-1 border-t border-slate-200 w-full max-w-lg">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-2xl font-black text-indigo-600 leading-none">{stat.value}</span>
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT: visual ════ */}
          <div className="hidden lg:flex items-center justify-center relative h-[520px]">

            {/* ── Organic background blob ── */}
            <div
              className="absolute inset-6 rounded-[38%_62%_63%_37%/41%_44%_56%_59%] bg-gradient-to-br from-orange-100/60 via-amber-50/40 to-indigo-100/50"
              style={{ filter: "blur(2px)" }}
            />

            {/* ── Corner dot grids ── */}
            <div
              className="absolute top-4 left-8 w-28 h-28 opacity-25 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />
            <div
              className="absolute bottom-4 right-6 w-24 h-24 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />

            {/* ── Decorative rings ── */}
            <div className="absolute top-10 right-12 w-14 h-14 rounded-full border-2 border-dashed border-orange-300/50 animate-float-slow pointer-events-none" />
            <div className="absolute bottom-14 left-10 w-8 h-8 rounded-full bg-indigo-200/60 animate-float pointer-events-none" />
            <div className="absolute top-1/3 left-6 w-5 h-5 rounded-full bg-orange-300/70 animate-float-slow pointer-events-none" />

            {/* ── Sparkle accents ── */}
            <Sparkles className="absolute top-12 left-1/3 w-5 h-5 text-orange-400/60 animate-float" />
            <Sparkles className="absolute bottom-16 right-1/3 w-4 h-4 text-indigo-400/50 animate-float-slow" />

            {/* ── Central logo group ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Outer spinning dashed ring */}
              <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-orange-300/40 animate-spin-slow pointer-events-none" />
              {/* Counter-spin ring */}
              <div className="absolute w-56 h-56 rounded-full border border-indigo-200/50 animate-spin-slow-reverse pointer-events-none" />
              {/* Glow */}
              <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-100/30 blur-xl pointer-events-none" />
              {/* Logo */}
              <Image
                src="/sarthi-logo.png"
                alt="Yuva Sarthi"
                width={192}
                height={192}
                className="relative z-10 w-44 h-44 drop-shadow-2xl"
                priority
              />
            </div>

            {/* ── Floating stat cards ── */}
            {stats.slice(0, 3).map((stat, i) => {
              const Icon = CARD_ICONS[i];
              return (
                <div
                  key={i}
                  className={`absolute z-20 bg-white/90 backdrop-blur-sm shadow-xl shadow-slate-200/60 rounded-2xl px-4 py-3 pointer-events-none ${CARD_POSITIONS[i]}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-indigo-100" : i === 1 ? "bg-orange-100" : "bg-emerald-100"}`}>
                      <Icon className={`w-4 h-4 ${i === 0 ? "text-indigo-600" : i === 1 ? "text-orange-500" : "text-emerald-600"}`} />
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-800 leading-none">{stat.value}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </Container>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
