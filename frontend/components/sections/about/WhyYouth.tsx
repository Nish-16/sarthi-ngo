import Image from "next/image";
import Container from "@/components/ui/Container";
import { Lightbulb, Users, Zap, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    label: "Urgency meets creativity",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Users,
    label: "Natural peer trust builders",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Zap,
    label: "Fast to experiment & adapt",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: TrendingUp,
    label: "Ripple-effect on communities",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

export default function WhyYouth() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-24">
      {/* blobs */}
      <div className="pointer-events-none absolute -left-16 bottom-4 h-72 w-72 rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-8 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl" />

      {/* dot grid */}
      <div
        className="absolute top-10 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            {/* dashed rings */}
            <div
              className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60"
              aria-hidden="true"
            />
            <div
              className="absolute -right-3 -bottom-3 w-3/4 h-3/4 rounded-3xl border-2 border-dashed border-orange-200/50"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[460px] shadow-2xl shadow-slate-300/40">
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80"
                alt="Youth group collaborating in a workshop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            {/* floating stat */}
            <div className="absolute -bottom-6 -right-2 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                Youth trained
              </p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">
                1,200+
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Why Youth?
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Young people move first when change{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                feels impossible
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Youth combine urgency with creativity. They understand emerging
              challenges quickly, build peer trust naturally, and experiment
              with solutions that established systems often overlook.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              By backing young leaders early, we create a ripple effect where
              one trained changemaker can influence schools, families, and whole
              communities.
            </p>

            {/* reason pills */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {reasons.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-sm font-semibold ${color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
