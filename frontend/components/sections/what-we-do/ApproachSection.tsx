import Container from "@/components/ui/Container";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import { getIcon } from "@/lib/icon-map";
import type { WwdApproachContent } from "@/types/content";

interface Props {
  content: WwdApproachContent;
}

export default function ApproachSection({ content }: Props) {
  const photos = [
    { src: content.image, alt: content.imageAlt },
    ...(content.images ?? []),
  ].filter((p) => p.src);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 overflow-hidden">
      {/* Subtle blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />
      <div
        className="absolute top-12 right-8 w-36 h-36 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
            {content.headline}{" "}
            <span className="relative inline-block">
              <span className="text-indigo-600">{content.headlineAccent}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
            </span>
          </h2>
        </div>

        <div className="grid xl:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Steps — timeline style */}
          <div>
            {content.steps.map((step, index) => {
              const Icon = getIcon(step.iconName);
              const isLast = index === content.steps.length - 1;
              return (
                <div key={step.title} className="relative flex gap-5 pb-10 last:pb-0 group">
                  {/* Connector line */}
                  {!isLast && (
                    <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-indigo-200 to-transparent" />
                  )}

                  {/* Icon circle */}
                  <div className="relative shrink-0 w-10 h-10 rounded-full bg-white border-2 border-indigo-100 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-md">
                    <Icon className="w-4 h-4 text-indigo-500" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-[9px] font-black text-white flex items-center justify-center shadow-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Photo carousel + quote */}
          <div className="relative">
            <PhotoCarousel
              photos={photos}
              className="h-[420px] md:h-[480px] shadow-xl shadow-slate-200/60 rounded-3xl"
            />

            {/* Quote card */}
            {content.quoteCard && (
              <div className="relative -mt-6 mx-4 rounded-2xl bg-indigo-600 text-white px-5 py-4 shadow-xl shadow-indigo-300/40 text-sm font-semibold leading-snug z-10">
                <span className="text-xl font-black mr-1 opacity-40">&ldquo;</span>
                {content.quoteCard}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
