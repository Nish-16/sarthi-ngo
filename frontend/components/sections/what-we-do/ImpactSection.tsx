import Container from "@/components/ui/Container";
import { Users, MapPin, BarChart3, GraduationCap } from "lucide-react";

const stats = [
  {
    value: "95K+",
    label: "People Reached",
    icon: Users,
    color: "bg-white/15 text-white border-white/20",
  },
  {
    value: "42",
    label: "Communities Impacted",
    icon: MapPin,
    color: "bg-white/15 text-white border-white/20",
  },
  {
    value: "280+",
    label: "Programs Conducted",
    icon: BarChart3,
    color: "bg-white/15 text-white border-white/20",
  },
  {
    value: "1,200+",
    label: "Youth Volunteers Trained",
    icon: GraduationCap,
    color: "bg-white/15 text-white border-white/20",
  },
] as const;

export default function ImpactSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 text-white p-10 md:p-16 shadow-2xl shadow-indigo-300/40 overflow-hidden">
          {/* internal blob */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

          {/* dot grid inside */}
          <div
            className="absolute top-8 right-8 w-28 h-28 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          {/* dashed ring */}
          <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-dashed border-white/20 animate-float-slow pointer-events-none" />

          <div className="relative z-10 max-w-2xl mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-100">
              Our Impact
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Numbers that reflect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                durable change
              </span>
            </h2>
          </div>

          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {stats.map(({ value, label, icon: Icon, color }) => (
              <article
                key={label}
                className={`rounded-2xl border backdrop-blur-md p-6 ${color} hover:bg-white/20 transition-colors duration-300`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-4xl font-black tracking-tight">{value}</p>
                <p className="mt-2 text-indigo-100 text-sm font-medium leading-snug">
                  {label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
