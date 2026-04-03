import Image from "next/image";
import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { AboutWhyYouthContent } from "@/types/content";

export default function WhyYouth({
  content,
}: {
  content: AboutWhyYouthContent;
}) {
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
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            {/* floating stat */}
            <div className="absolute -bottom-6 -right-2 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                {content.statLabel}
              </p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">
                {content.statValue}
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {content.headlineAccent}
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {content.description1}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {content.description2}
            </p>

            {/* reason pills */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {content.reasons.map((reason) => {
                const Icon = getIcon(reason.iconName);
                return (
                  <div
                    key={reason.label}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-sm font-semibold ${reason.color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{reason.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
