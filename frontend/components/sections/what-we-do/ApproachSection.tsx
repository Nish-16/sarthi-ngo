import Image from "next/image";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { WwdApproachContent } from "@/types/content";

interface Props {
  content: WwdApproachContent;
}

export default function ApproachSection({ content }: Props) {
  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-indigo-900/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-900/40 blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute top-12 right-8 w-36 h-36 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #67e8f9 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="absolute bottom-16 left-12 w-32 h-32 rounded-full border border-dashed border-white/10 animate-float-slow pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid xl:grid-cols-12 gap-12 items-start">
          {/* Steps */}
          <div className="xl:col-span-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                {content.headlineAccent}
              </span>
            </h2>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-4 relative">
              {content.steps.map((step, index) => {
                const Icon = getIcon(step.iconName);
                return (
                  <article
                    key={step.title}
                    className="relative rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 backdrop-blur-sm p-6 transition-all duration-300 group"
                  >
                    <span className="absolute top-4 right-4 text-xs font-black text-white/20">
                      0{index + 1}
                    </span>

                    <div className={`w-11 h-11 rounded-2xl border ${step.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-slate-400 text-sm leading-relaxed">{step.description}</p>

                    {index < content.steps.length - 1 && (
                      <ArrowRight
                        className="hidden xl:block absolute -right-5 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 z-10"
                        aria-hidden="true"
                      />
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Image aside */}
          <aside className="xl:col-span-4 relative xl:mt-12">
            <div className="relative rounded-3xl overflow-hidden h-[380px]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-4 right-6 rounded-2xl bg-cyan-400 text-slate-950 px-5 py-4 font-semibold shadow-xl shadow-cyan-500/30 text-sm leading-snug">
              {content.quoteCard}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
