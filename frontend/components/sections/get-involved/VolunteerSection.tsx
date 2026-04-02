import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Flexible time commitment — from weekends to full immersion",
  "Hands-on training before your first program deployment",
  "Field experience across education, health, and climate sectors",
  "Certificate of contribution from Sarthi on completion",
  "Access to our alumni network and career support sessions",
  "Travel and logistics support for outstation programs",
];

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute top-16 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text + Benefits */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Become a Volunteer
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Give your time.{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">Multiply the impact.</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Our volunteers are the engine of every program. Whether you can give
              two hours a week or commit to a full season, there's a role built for you.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/get-involved" size="lg">
                Apply as Volunteer
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -right-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60" aria-hidden="true" />

            <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl shadow-indigo-200/40">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
                alt="Volunteers working in the field"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute top-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">Open spots</p>
              <p className="text-2xl font-black text-indigo-600 mt-0.5">200+</p>
            </div>

            <div className="absolute bottom-8 -right-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-400/30 px-5 py-3 animate-float-slow pointer-events-none">
              <p className="text-xs text-indigo-200 font-medium">Next intake</p>
              <p className="text-sm font-bold mt-0.5">Rolling admissions</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
