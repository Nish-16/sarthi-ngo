import Image from "next/image";
import Container from "@/components/ui/Container";
import { AlertTriangle, TrendingDown, Users } from "lucide-react";

const gaps = [
  {
    icon: TrendingDown,
    label: "Unequal Learning Access",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: Users,
    label: "Fragmented Community Support",
    color: "text-indigo-500 bg-indigo-50",
  },
  {
    icon: AlertTriangle,
    label: "Broken Livelihood Pathways",
    color: "text-rose-500 bg-rose-50",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* blobs */}
      <div className="absolute top-16 right-0 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-4 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute top-10 left-2 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
              The Problem
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              High-potential communities blocked by{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">unequal access</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              Across many neighborhoods, young people face fragmented access to
              quality learning, health support, and livelihood opportunities.
              The issue is not lack of ambition, but the gap between existing
              systems and local realities.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              We work where that gap is widest, building practical interventions
              with residents, schools, and local institutions so progress is
              shared, measurable, and lasting.
            </p>

            {/* gap pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {gaps.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${color}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {/* dashed ring */}
            <div
              className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60"
              aria-hidden="true"
            />
            {/* second accent ring */}
            <div
              className="absolute -right-3 -bottom-3 w-3/4 h-3/4 rounded-3xl border-2 border-dashed border-orange-200/50"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-[360px] md:min-h-[440px] shadow-2xl shadow-slate-300/40">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-b53601020d72?w=1400&q=80"
                alt="Community members discussing local challenges"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            {/* floating stat */}
            <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">Communities reached</p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">42+</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
