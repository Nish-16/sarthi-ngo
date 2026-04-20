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
import { ArrowRight, Compass, Handshake, Sparkles } from "lucide-react";

export const revalidate = 3600; // ISR: revalidate every 1 hour

export default async function WhatWeDoPage() {
  const [shared, wwd] = await Promise.all([readShared(), readWhatWeDo()]);
  const [primary, secondary] = wwd.signatureProjects.initiatives;

  return (
    <>
      <Navbar content={shared.navbar} />
      <main className="flex flex-col flex-1">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-8 overflow-hidden bg-linear-to-br from-slate-50 via-white to-cyan-50/50 min-h-[92vh] flex items-end">
          {/* Atmospheric background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_80%_at_0%_10%,rgba(14,165,233,0.16),transparent_55%),radial-gradient(60%_60%_at_100%_0%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(60%_70%_at_50%_100%,rgba(249,115,22,0.12),transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.2] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <Container className="relative z-10 pb-0 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              {/* Left — content */}
              <div className="lg:col-span-7 pb-16 lg:pb-24">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold px-4 py-2 rounded-full mb-7">
                  <Sparkles className="w-3 h-3" />
                  {wwd.hero.badge}
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.98] max-w-3xl">
                  {wwd.hero.headline}{" "}
                  <span className="text-indigo-600">{wwd.hero.headlineAccent}</span>
                </h1>

                <p className="mt-7 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {wwd.hero.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-700">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80">
                    <Compass className="w-3.5 h-3.5" />
                    Community-first design
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80">
                    <Handshake className="w-3.5 h-3.5" />
                    Local partnerships
                  </span>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href={wwd.hero.ctaPrimaryHref} size="lg" className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">
                    <span>{wwd.hero.ctaPrimary}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    href={wwd.hero.ctaSecondaryHref}
                    variant="ghost"
                    size="lg"
                    className="text-slate-700 border border-slate-300 hover:bg-slate-100"
                  >
                    {wwd.hero.ctaSecondary}
                  </Button>
                </div>
              </div>

              {/* Right — visual panel */}
              <div className="lg:col-span-5 pb-8 lg:pb-16">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {primary?.image && (
                    <div className="relative h-90 md:h-105 rounded-4xl overflow-hidden ring-1 ring-slate-200 shadow-2xl shadow-indigo-200/50">
                      <Image
                        src={primary.image}
                        alt={primary.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 34vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/15 to-transparent" />
                      <div className="absolute left-5 bottom-5 text-white">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/90">
                          Featured Initiative
                        </p>
                        <p className="text-lg font-bold mt-1">{primary.name}</p>
                        <p className="text-sm text-slate-200/90 mt-0.5">{primary.tagline}</p>
                      </div>
                    </div>
                  )}

                  {secondary?.image && (
                    <div className="absolute -left-6 md:-left-10 -bottom-8 w-[62%] h-44 rounded-3xl overflow-hidden ring-1 ring-slate-200 shadow-xl shadow-indigo-200/45 bg-white">
                      <Image
                        src={secondary.image}
                        alt={secondary.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 45vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/65 to-transparent" />
                      <div className="absolute left-4 bottom-3 text-white">
                        <p className="text-xs font-semibold leading-none">{secondary.name}</p>
                        <p className="text-[11px] text-slate-200/90 mt-1 leading-none">{secondary.tagline}</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute -right-3 top-8 rounded-2xl border border-indigo-200 bg-white/90 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-indigo-700 shadow-sm">
                    Youth-led systems change
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
            <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 56L1440 56L1440 20C1200 56 960 2 720 18C480 34 240 8 0 34L0 56Z" fill="white" />
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
