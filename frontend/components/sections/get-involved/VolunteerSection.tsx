import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { GetInvolvedVolunteerContent } from "@/types/content";

export default function VolunteerSection({
  content,
}: {
  content: GetInvolvedVolunteerContent;
}) {
  return (
    <section
      id="volunteer"
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute top-16 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text + Benefits */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">
                  {content.headlineAccent}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {content.description}
            </p>

            <ul className="mt-8 space-y-3">
              {content.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={content.ctaHref} size="lg">
                {content.ctaLabel}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="absolute -right-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl shadow-indigo-200/40">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute top-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                {content.openSpotsLabel}
              </p>
              <p className="text-2xl font-black text-indigo-600 mt-0.5">
                {content.openSpotsValue}
              </p>
            </div>

            <div className="absolute bottom-8 -right-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-400/30 px-5 py-3 animate-float-slow pointer-events-none">
              <p className="text-xs text-indigo-200 font-medium">
                {content.intakeLabel}
              </p>
              <p className="text-sm font-bold mt-0.5">{content.intakeValue}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
