import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { Trophy } from "lucide-react";
import type { HeroContent } from "@/types/content";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30">
      {/* Background decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-7 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {content.badge}
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              {content.headline}{" "}
              <span className="relative">
                <span className="text-indigo-600">{content.headlineAccent}</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full"
                  aria-hidden="true"
                />
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {content.headlineEnd}
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              {content.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" href="#join">
                <span>{content.ctaPrimary}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
              <Button variant="ghost" size="lg" href="#about">
                {content.ctaSecondary}
              </Button>
            </div>

            {/* Trust signal */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-3">
                {content.memberAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden relative shadow-sm"
                  >
                    <Image
                      src={src}
                      alt="Member"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {content.memberCount}
                </p>
                <p className="text-xs text-slate-400">{content.memberCities}</p>
              </div>
            </div>
          </div>

          {/* Right: Clipped Image Slices */}
          <div className="relative flex items-center justify-center lg:justify-end h-[520px]">
            {/* Decorative rings */}
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full border-2 border-dashed border-indigo-200/60 animate-float-slow pointer-events-none" />
            <div className="absolute bottom-10 left-4 w-24 h-24 rounded-full border-2 border-orange-200/60 animate-float pointer-events-none" />

            {/* Dot grids */}
            <div
              className="absolute top-8 left-0 w-32 h-32 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div
              className="absolute bottom-4 right-0 w-28 h-28 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Floating cards */}
            <div className="absolute top-12 left-8 z-20 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-4 py-3 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">Impact Score</p>
              <p className="text-2xl font-black text-indigo-600">
                {content.impactScore}
              </p>
            </div>

            <div className="absolute bottom-16 right-0 z-20 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-4 py-3 animate-float-slow pointer-events-none">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-slate-400 font-medium leading-none">
                    Award
                  </p>
                  <p className="text-sm font-bold text-slate-800 leading-none mt-0.5">
                    {content.awardLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Image slices */}
            <div className="relative flex items-stretch h-[480px] w-full max-w-[500px]">
              {content.images.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-1"
                  style={{
                    clipPath: img.clipPath,
                    marginLeft: i > 0 ? "-2.5rem" : "0",
                    zIndex: i + 1,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-indigo-900/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
