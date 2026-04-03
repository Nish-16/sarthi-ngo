import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { GetInvolvedInternContent } from "@/types/content";

export default function InternSection({
  content,
}: {
  content: GetInvolvedInternContent;
}) {
  return (
    <section id="intern" className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-16 left-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a855f7 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-purple-200/60"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl shadow-purple-200/30">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute top-6 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                {content.durationLabel}
              </p>
              <p className="text-lg font-black text-purple-600 mt-0.5">
                {content.durationValue}
              </p>
            </div>

            <div className="absolute bottom-8 -left-4 bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-400/30 px-5 py-3 animate-float-slow pointer-events-none">
              <p className="text-xs text-purple-200 font-medium">
                {content.trainedLabel}
              </p>
              <p className="text-xl font-black mt-0.5">
                {content.trainedValue}
              </p>
            </div>
          </div>

          {/* Text + Opportunities */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                {content.headlineAccent}
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {content.description}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.opportunities.map((opportunity) => {
                const Icon = getIcon(opportunity.iconName);
                return (
                  <div
                    key={opportunity.title}
                    className={`flex gap-3 p-4 rounded-2xl border ${opportunity.color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">
                        {opportunity.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                        {opportunity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <Button href={content.ctaHref} variant="outline" size="lg">
                {content.ctaLabel}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
