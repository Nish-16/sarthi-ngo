import Container from "@/components/ui/Container";
import { Telescope, Target, Heart } from "lucide-react";

const pillars = [
  {
    title: "Vision",
    icon: Telescope,
    description:
      "A future where every young person has the confidence, skills, and platform to shape inclusive communities.",
    accent: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-500",
    tag: "Where we're going",
  },
  {
    title: "Mission",
    icon: Target,
    description:
      "Mobilize youth through action-led programs in education, climate awareness, mental wellbeing, and civic participation.",
    accent: "from-orange-500 to-rose-500",
    bg: "bg-orange-50 border-orange-100",
    iconBg: "bg-gradient-to-br from-orange-500 to-rose-500",
    tag: "What we do daily",
  },
  {
    title: "Values",
    icon: Heart,
    description:
      "Shared leadership, empathy, accountability, and local co-creation guide everything we design and deliver.",
    accent: "from-cyan-500 to-teal-500",
    bg: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
    tag: "How we show up",
  },
] as const;

export default function VisionMissionValues() {
  return (
    <section className="relative overflow-hidden py-24 bg-white">
      {/* blobs */}
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

      {/* dot grid */}
      <div
        className="absolute bottom-10 left-6 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Vision · Mission · Values
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              The principles behind{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">every initiative</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-500 text-sm leading-relaxed">
            Three pillars that guide our decisions, programs, and partnerships.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className={`group relative rounded-3xl border p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${pillar.bg} ${i === 1 ? "lg:translate-y-6" : ""}`}
              >
                {/* large faint number */}
                <span className="absolute top-4 right-5 text-7xl font-black text-slate-900/5 select-none pointer-events-none leading-none">
                  0{i + 1}
                </span>

                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center text-white shadow-lg mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                  {pillar.tag}
                </span>
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600 text-[15px]">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
