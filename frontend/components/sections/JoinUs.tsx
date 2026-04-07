import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { JoinUsContent } from "@/types/content";

export default function JoinUs({ content }: { content: JoinUsContent }) {
  return (
    <section id="join" className="relative py-20 lg:py-28 bg-white overflow-hidden">

      {/* Mobile: full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 lg:hidden pointer-events-none" />

      {/* Desktop: diagonal indigo panel — fills right side */}
      <div
        className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 pointer-events-none hidden lg:block"
        style={{ clipPath: "polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      {/* Soft glow behind the diagonal edge (desktop only) */}
      <div className="absolute top-1/2 left-[38%] -translate-y-1/2 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none hidden lg:block" />

      {/* Shapes ON the indigo panel (desktop only) */}
      <div className="hidden lg:block">
        {/* Three concentric rings */}
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-[2px] border-white/20 animate-float-slow pointer-events-none" />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 translate-x-[2.5rem] w-52 h-52 rounded-full border-[1.5px] border-white/30 pointer-events-none" />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 translate-x-[5.5rem] w-28 h-28 rounded-full border border-white/45 pointer-events-none" />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 translate-x-[8.5rem] w-10 h-10 rounded-full bg-white/25 pointer-events-none" />

        {/* Top-right rotated squares */}
        <div className="absolute top-8 right-10 w-20 h-20 border-2 border-white/25 rotate-[22deg] pointer-events-none" />
        <div className="absolute top-14 right-14 w-8 h-8 bg-white/15 rotate-45 pointer-events-none" />
        <div className="absolute top-6 right-36 w-4 h-4 border border-white/30 rotate-[12deg] pointer-events-none" />

        {/* Bottom shapes */}
        <div className="absolute bottom-10 right-1/4 w-14 h-14 border-[1.5px] border-white/25 rotate-[15deg] pointer-events-none" />
        <div className="absolute bottom-16 right-[28%] w-5 h-5 bg-white/20 rotate-45 pointer-events-none" />
        <div className="absolute bottom-6 right-16 w-24 h-24 border border-white/15 rotate-[35deg] pointer-events-none" />

        {/* Small scattered diamonds */}
        <div className="absolute top-1/4 right-8 w-3 h-3 bg-white/35 rotate-45 pointer-events-none" />
        <div className="absolute top-2/3 right-6 w-2 h-2 bg-white/40 rotate-45 pointer-events-none" />
        <div className="absolute top-1/3 right-48 w-2 h-2 bg-white/30 rotate-45 pointer-events-none" />

        {/* Scattered dots */}
        <div className="absolute top-12 right-64 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
        <div className="absolute bottom-28 right-10 w-1.5 h-1.5 rounded-full bg-white/50 pointer-events-none" />
        <div className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-white/30 pointer-events-none" />

        {/* Thin SVG diagonal rules */}
        <svg className="absolute inset-y-0 right-0 w-[55%] h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none">
          <line x1="20%" y1="0%" x2="60%" y2="100%" stroke="white" strokeWidth="0.7" strokeOpacity="0.08" />
          <line x1="50%" y1="0%" x2="90%" y2="100%" stroke="white" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="70%" y1="0%" x2="100%" y2="55%" stroke="white" strokeWidth="0.4" strokeOpacity="0.05" />
        </svg>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center lg:min-h-[420px]">

          {/* Left: text */}
          <div className="flex flex-col gap-6 lg:gap-7 lg:pr-8">

            <div className="flex items-center gap-3">
              <span className="block w-8 h-[2px] bg-indigo-500 rounded-full" />
              <span className="text-[0.7rem] font-black text-indigo-600 uppercase tracking-[0.28em]">
                {content.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-slate-900 leading-[1.06] tracking-tight">
              {content.headline}{" "}
              <span className="text-indigo-600">{content.headlineAccent}</span>{" "}
              <span className="text-slate-400 font-light italic">in your community?</span>
            </h2>

            <div className="w-10 h-[2px] bg-slate-200 rounded-full" />

            <p className="text-slate-500 text-base md:text-[1.05rem] leading-relaxed max-w-md">
              {content.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="lg">
                {content.ctaPrimary}
              </Button>
              <a
                href={content.ctaSecondaryHref}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-medium transition-colors text-sm group"
              >
                {content.ctaSecondary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {content.badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-slate-400 text-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: intentionally empty on desktop — the panel + shapes fill this visually */}
          <div className="hidden lg:block" />
        </div>
      </Container>
    </section>
  );
}
