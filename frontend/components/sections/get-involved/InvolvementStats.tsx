import Container from "@/components/ui/Container";
import { Building2, Users, GraduationCap, Clock } from "lucide-react";

const stats = [
  {
    value: "150+",
    label: "Colleges & Institutions",
    description: "Partnerships with schools and universities",
    icon: Building2,
    gradient: "from-indigo-400 to-purple-400",
    iconColor: "bg-indigo-400/15 text-indigo-300 border-indigo-400/20",
  },
  {
    value: "1,200+",
    label: "Active Volunteers",
    description: "Across 42 communities and counting",
    icon: Users,
    gradient: "from-cyan-400 to-sky-400",
    iconColor: "bg-cyan-400/15 text-cyan-300 border-cyan-400/20",
  },
  {
    value: "320+",
    label: "Interns Trained",
    description: "With certified field experience",
    icon: GraduationCap,
    gradient: "from-orange-400 to-rose-400",
    iconColor: "bg-orange-400/15 text-orange-300 border-orange-400/20",
  },
  {
    value: "50K+",
    label: "Hours Contributed",
    description: "Of community-led service time",
    icon: Clock,
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "bg-emerald-400/15 text-emerald-300 border-emerald-400/20",
  },
] as const;

export default function InvolvementStats() {
  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-indigo-900/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-900/40 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute bottom-12 left-10 w-24 h-24 rounded-full border border-dashed border-white/10 animate-float-slow pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Our Reach
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Numbers that prove{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
              collective action works
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ value, label, description, icon: Icon, gradient, iconColor }) => (
            <article
              key={label}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mx-auto mb-4 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={`text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${gradient} leading-none mb-2`}>
                {value}
              </p>
              <p className="text-white font-bold text-base">{label}</p>
              <p className="text-slate-400 text-xs mt-1 leading-snug">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
