import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { readContent } from "@/lib/content";
import ProjectsSection from "@/components/sections/what-we-do/ProjectsSection";
import PreviousProjects from "@/components/sections/what-we-do/PreviousProjects";
import ProblemSection from "@/components/sections/what-we-do/ProblemSection";
import ApproachSection from "@/components/sections/what-we-do/ApproachSection";
import ImpactSection from "@/components/sections/what-we-do/ImpactSection";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WhatWeDoPage() {
  const content = readContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex flex-col flex-1">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-0 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 min-h-[72vh] flex items-center">
          {/* blobs */}
          <div className="absolute top-16 left-6 w-80 h-80 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
          <div className="absolute top-32 right-0 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />

          {/* dot grid top-left */}
          <div
            className="absolute top-24 left-8 w-36 h-36 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          {/* dot grid bottom-right */}
          <div
            className="absolute bottom-16 right-10 w-28 h-28 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* dashed ring */}
          <div className="absolute top-20 right-20 w-44 h-44 rounded-full border-2 border-dashed border-indigo-200/50 animate-float-slow pointer-events-none" />
          <div className="absolute bottom-24 left-16 w-20 h-20 rounded-full border-2 border-orange-200/60 animate-float pointer-events-none" />

          <Container className="relative z-10 pb-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Programs and Initiatives
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                What{" "}
                <span className="relative inline-block">
                  <span className="text-indigo-600">We Do</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400 rounded-full"
                    aria-hidden="true"
                  />
                </span>
              </h1>
              <p className="mt-7 text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
                We co-create high-impact programs with communities, turning
                local challenges into scalable, youth-led solutions that last.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#projects" size="lg">
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button href="/get-involved" variant="ghost" size="lg">
                  Partner With Us
                </Button>
              </div>
            </div>
          </Container>

          {/* bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path
                d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <div id="projects">
          <ProjectsSection />
        </div>
        <PreviousProjects />
        <ProblemSection />
        <ApproachSection />
        <ImpactSection />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
