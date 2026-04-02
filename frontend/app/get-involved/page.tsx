import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { readContent } from "@/lib/content";
import InvolvementGrid from "@/components/sections/get-involved/InvolvementGrid";
import WhyJoin from "@/components/sections/get-involved/WhyJoin";
import InvolvementStats from "@/components/sections/get-involved/InvolvementStats";
import Testimonials from "@/components/sections/get-involved/Testimonials";
import VolunteerSection from "@/components/sections/get-involved/VolunteerSection";
import InternSection from "@/components/sections/get-involved/InternSection";
import CollaborateSection from "@/components/sections/get-involved/CollaborateSection";
import { Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Get Involved | Sarthi NGO",
  description:
    "Volunteer, intern, donate, or collaborate with Sarthi. Join 1,200+ changemakers building youth-led community impact across India.",
};

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
    alt: "Team working together",
    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-b53601020d72?w=1400&q=80",
    alt: "Community engagement",
    clipPath: "polygon(20% 0, 100% 0, 100% 100%, 5% 100%)",
  },
];

export default function GetInvolvedPage() {
  const content = readContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex flex-1 flex-col">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 pt-28 pb-0">
          {/* blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* dot grids */}
          <div
            className="absolute top-24 left-8 w-36 h-36 opacity-25 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div
            className="absolute bottom-20 right-12 w-28 h-28 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* dashed rings */}
          <div className="absolute top-16 right-24 w-48 h-48 rounded-full border-2 border-dashed border-indigo-200/50 animate-float-slow pointer-events-none" />
          <div className="absolute bottom-28 left-20 w-20 h-20 rounded-full border-2 border-orange-200/60 animate-float pointer-events-none" />

          <Container className="relative z-10 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[72vh]">

              {/* Left: text */}
              <div className="flex flex-col gap-7 animate-fade-up">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  Join the Movement
                </div>

                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Be a part of{" "}
                  <span className="relative inline-block">
                    <span className="text-indigo-600">the change</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400 rounded-full" aria-hidden="true" />
                  </span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                  Whether you have two hours or two years to give, there's a meaningful
                  role for you at Sarthi. Volunteer, intern, donate, or collaborate — every
                  contribution shapes the future of communities.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" href="#get-involved-options">
                    <span>Get Involved</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="lg" href="#volunteer">
                    Volunteer Now
                  </Button>
                </div>

                {/* quick stats */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { val: "1,200+", label: "Volunteers" },
                    { val: "320+", label: "Interns" },
                    { val: "50K+", label: "Hours given" },
                  ].map(({ val, label }) => (
                    <div
                      key={label}
                      className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm"
                    >
                      <p className="text-xl font-black text-slate-900 leading-none">{val}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image slices */}
              <div className="relative flex items-center justify-center lg:justify-end h-[500px]">
                {/* floating card */}
                <div className="absolute top-10 left-4 z-20 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-4 py-3 animate-float pointer-events-none border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Open roles</p>
                  <p className="text-2xl font-black text-indigo-600">6 ways</p>
                </div>
                <div className="absolute bottom-16 right-0 z-20 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-4 py-3 animate-float-slow pointer-events-none border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Communities</p>
                  <p className="text-2xl font-black text-indigo-600">42</p>
                </div>

                {/* image slices */}
                <div className="relative flex items-stretch h-[460px] w-full max-w-[480px]">
                  {heroImages.map((img, i) => (
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

            {/* scroll cue */}
            <div className="hidden lg:flex justify-center mt-4 pb-4">
              <a
                href="#get-involved-options"
                className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors"
                aria-label="Scroll down"
              >
                <span className="text-xs font-medium">Explore options</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </Container>

          {/* bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z" fill="white" />
            </svg>
          </div>
        </section>

        <InvolvementGrid />
        <WhyJoin />
        <Testimonials />
        <InvolvementStats />
        <VolunteerSection />
        <InternSection />
        <CollaborateSection />

      </main>
      <Footer content={content.footer} />
    </>
  );
}
