import Image from "next/image";
import Container from "@/components/ui/Container";
import { Zap, ShieldCheck, TrendingUp, Users, BookOpen, Star } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Real-world impact from day one",
    description: "Work on live programs that reach thousands of people, not hypothetical projects.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: BookOpen,
    title: "Structured skill development",
    description: "Access workshops, mentorship sessions, and field training across social sectors.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Users,
    title: "A network of 1,200+ changemakers",
    description: "Connect with volunteers, alumni, and partners across 42 communities.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: ShieldCheck,
    title: "Certified and recognised work",
    description: "Earn certificates and endorsements that reflect verified, measurable contribution.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: TrendingUp,
    title: "Career-defining experience",
    description: "Past volunteers have gone on to lead social enterprises, NGOs, and policy roles.",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    icon: Star,
    title: "Be part of a shared story",
    description: "Your efforts are documented, credited, and celebrated within our community.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

export default function WhyJoin() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-12 right-10 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60" aria-hidden="true" />
            <div className="absolute -right-3 -bottom-3 w-3/4 h-3/4 rounded-3xl border-2 border-dashed border-orange-200/50" aria-hidden="true" />

            <div className="relative rounded-3xl overflow-hidden min-h-[400px] shadow-2xl shadow-slate-300/40">
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80"
                alt="Youth volunteers at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            <div className="absolute -bottom-6 -right-2 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">Avg. satisfaction rate</p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">97%</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Why Join Us?
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              More than just{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                volunteering
              </span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Being part of Sarthi means growing alongside the communities you serve —
              personally, professionally, and collectively.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map(({ icon: Icon, title, description, color }) => (
                <div
                  key={title}
                  className={`group flex gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${color}`}
                >
                  <div className="shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">{title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
