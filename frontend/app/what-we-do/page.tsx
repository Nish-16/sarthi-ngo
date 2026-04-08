import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { readShared, readWhatWeDo } from "@/lib/content";
import ProjectsSection from "@/components/sections/what-we-do/ProjectsSection";
import PreviousProjects from "@/components/sections/what-we-do/PreviousProjects";
import ApproachSection from "@/components/sections/what-we-do/ApproachSection";
import ImpactSection from "@/components/sections/what-we-do/ImpactSection";
import { ArrowRight, Sparkles } from "lucide-react";

export const revalidate = 3600; // ISR: revalidate every 1 hour

export default async function WhatWeDoPage() {
  const [shared, wwd] = await Promise.all([readShared(), readWhatWeDo()]);
  const [primary, secondary] = wwd.signatureProjects.initiatives;

  return (
    <>
      <Navbar content={shared.navbar} />
      <main className="flex flex-col flex-1">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-0 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 min-h-[90vh] flex items-end">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-100/70 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Dashed ring */}
          <div className="absolute top-20 right-20 w-44 h-44 rounded-full border-2 border-dashed border-indigo-200/60 animate-float-slow pointer-events-none" />

          <Container className="relative z-10 pb-0 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
              {/* Left — text */}
              <div className="pb-20">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold px-4 py-2 rounded-full mb-7">
                  <Sparkles className="w-3 h-3" />
                  {wwd.hero.badge}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                  {wwd.hero.headline}{" "}
                  <span className="relative inline-block">
                    <span className="text-indigo-600">
                      {wwd.hero.headlineAccent}
                    </span>
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400 rounded-full"
                      aria-hidden="true"
                    />
                  </span>
                </h1>
                <p className="mt-7 text-base md:text-lg text-slate-500 leading-relaxed max-w-lg">
                  {wwd.hero.description}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href={wwd.hero.ctaPrimaryHref} size="lg">
                    <span>{wwd.hero.ctaPrimary}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button href={wwd.hero.ctaSecondaryHref} variant="ghost" size="lg">
                    {wwd.hero.ctaSecondary}
                  </Button>
                </div>
              </div>

              {/* Right — staggered image collage */}
              <div className="relative hidden lg:block h-[560px]">
                {/* Primary image — tall, right-side */}
                {primary?.image && (
                  <div className="absolute right-0 top-16 w-[58%] h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/60 ring-1 ring-slate-200">
                    <Image
                      src={primary.image}
                      alt={primary.name}
                      fill
                      className="object-cover"
                      sizes="30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                      {primary.tagline}
                    </div>
                  </div>
                )}

                {/* Secondary image — shorter, left-overlapping */}
                {secondary?.image && (
                  <div className="absolute left-0 bottom-0 w-[54%] h-[300px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/40 ring-1 ring-slate-200 z-10">
                    <Image
                      src={secondary.image}
                      alt={secondary.name}
                      fill
                      className="object-cover"
                      sizes="27vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                      {secondary.tagline}
                    </div>
                  </div>
                )}

                {/* Decorative elements */}
                <div className="absolute top-6 left-1/3 w-16 h-16 rounded-full border-2 border-dashed border-indigo-200 animate-float pointer-events-none" />
                <div className="absolute top-1/2 right-[58%] w-3 h-3 rounded-full bg-indigo-300 blur-sm pointer-events-none" />
                <div className="absolute bottom-20 right-[10%] w-2.5 h-2.5 rounded-full bg-orange-400 pointer-events-none" />
              </div>
            </div>
          </Container>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
            <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path
                d="M0 56L1440 56L1440 18C1200 56 960 0 720 18C480 36 240 8 0 36L0 56Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <div id="projects">
          <ProjectsSection content={wwd.signatureProjects} />
        </div>
        <PreviousProjects content={wwd.previousProjects} />
        <ApproachSection content={wwd.approach} />
        <ImpactSection content={wwd.impact} />
      </main>
      <Footer content={shared.footer} />
    </>
  );
}
