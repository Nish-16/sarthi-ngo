import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import TeamGrid from "@/components/sections/team/TeamGrid";
import { readContent } from "@/lib/content";
import { Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "Our Team | Sarthi NGO",
  description:
    "Meet the passionate leaders, coordinators, and volunteers driving change at Sarthi.",
};

export default function TeamPage() {
  const content = readContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex flex-1 flex-col">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30">
          {/* blobs */}
          <div className="absolute top-16 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-32 right-1/4 w-56 h-56 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* dot grid */}
          <div
            className="absolute top-20 right-10 w-36 h-36 opacity-25 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div
            className="absolute bottom-16 left-8 w-24 h-24 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* dashed rings */}
          <div className="absolute top-12 right-16 w-52 h-52 rounded-full border-2 border-dashed border-indigo-200/50 animate-float-slow pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-20 h-20 rounded-full border-2 border-orange-200/60 animate-float pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                The People Behind Sarthi
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                Our{" "}
                <span className="relative inline-block">
                  <span className="text-indigo-600">Team</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400 rounded-full"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="mt-7 text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
                Meet the passionate leaders, field coordinators, and volunteers who
                turn ideas into action — every single day.
              </p>

              {/* stat pills */}
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xl font-black text-slate-900">1,200+</p>
                    <p className="text-xs text-slate-400 font-medium">Active volunteers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-[9px] font-black">42</span>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">42</p>
                    <p className="text-xs text-slate-400 font-medium">Communities served</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-rose-400" />
                  <div>
                    <p className="text-xl font-black text-slate-900">8+</p>
                    <p className="text-xs text-slate-400 font-medium">Years building together</p>
                  </div>
                </div>
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

        <TeamGrid />

      </main>
      <Footer content={content.footer} />
    </>
  );
}
