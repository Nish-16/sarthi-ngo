import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight, Briefcase, BarChart3, Users, Award } from "lucide-react";

const opportunities = [
  {
    icon: Briefcase,
    title: "Program Management",
    description: "Plan and coordinate field programs end-to-end with senior team support.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: BarChart3,
    title: "Research & Impact",
    description: "Design surveys, analyse outcomes, and document stories from the ground.",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Build trust with local partners and mobilise community participation.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: Award,
    title: "Communications & Design",
    description: "Tell our story through content, social media, and visual design.",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
];

export default function InternSection() {
  return (
    <section id="intern" className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-16 left-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #a855f7 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div className="relative">
            <div className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-purple-200/60" aria-hidden="true" />

            <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl shadow-purple-200/30">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80"
                alt="Intern working on research"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute top-6 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">Duration</p>
              <p className="text-lg font-black text-purple-600 mt-0.5">3–6 months</p>
            </div>

            <div className="absolute bottom-8 -left-4 bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-400/30 px-5 py-3 animate-float-slow pointer-events-none">
              <p className="text-xs text-purple-200 font-medium">Interns trained</p>
              <p className="text-xl font-black mt-0.5">320+</p>
            </div>
          </div>

          {/* Text + Opportunities */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-600">
              Intern With Us
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Build skills that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                classrooms can't teach
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Our internships are project-based, field-facing, and built around real
              responsibility. You'll leave with a portfolio, a network, and a story worth telling.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunities.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className={`flex gap-3 p-4 rounded-2xl border ${color}`}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">{title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/get-involved" variant="outline" size="lg">
                Apply for Internship
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
