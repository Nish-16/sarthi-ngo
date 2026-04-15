import Image from "next/image";
import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import { hexToRgba, isHexColor } from "@/lib/color";
import type { GetInvolvedWhyJoinContent } from "@/types/content";

export default function WhyJoin({
  content,
}: {
  content: GetInvolvedWhyJoinContent;
}) {
  return (
    <section className="relative py-24 bg-linear-to-br from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-12 right-10 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60"
              aria-hidden="true"
            />
            <div
              className="absolute -right-3 -bottom-3 w-3/4 h-3/4 rounded-3xl border-2 border-dashed border-orange-200/50"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-100 shadow-2xl shadow-slate-300/40">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            <div className="absolute -bottom-6 -right-2 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                {content.satisfactionLabel}
              </p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">
                {content.satisfactionValue}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                {content.headlineAccent}
              </span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              {content.description}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.benefits.map((benefit) => {
                const Icon = getIcon(benefit.iconName);
                const benefitColor = benefit.color.trim();
                const useHex = isHexColor(benefitColor);
                return (
                  <div
                    key={benefit.title}
                    className={`group flex gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${useHex ? "" : benefit.color}`}
                    style={
                      useHex
                        ? {
                            color: benefitColor,
                            backgroundColor: hexToRgba(benefitColor, 0.1),
                            borderColor: hexToRgba(benefitColor, 0.35),
                          }
                        : undefined
                    }
                  >
                    <div className="shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">
                        {benefit.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
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
