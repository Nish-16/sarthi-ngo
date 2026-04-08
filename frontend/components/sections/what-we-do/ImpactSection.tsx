import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { WwdImpactContent } from "@/types/content";

interface Props {
  content: WwdImpactContent;
}

export default function ImpactSection({ content }: Props) {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-50 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-50 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Editorial header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-500 mb-4">
              {content.eyebrow}
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                  {content.headlineAccent}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400/60 rounded-full" />
              </span>
            </h2>
          </div>

          {/* Decorative rule */}
          <div className="hidden lg:flex items-center gap-3 text-slate-300">
            <div className="h-px w-16 bg-slate-200" />
            <div className="w-2 h-2 rounded-full bg-indigo-300" />
            <div className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        {/* Stats grid — bento-style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {content.stats.map(({ value, label, iconName }, i) => {
            const Icon = getIcon(iconName);
            const accents = [
              "from-indigo-50 to-indigo-100/60 border-indigo-100",
              "from-cyan-50 to-cyan-100/60 border-cyan-100",
              "from-orange-50 to-orange-100/60 border-orange-100",
              "from-emerald-50 to-emerald-100/60 border-emerald-100",
            ];
            const iconColors = [
              "text-indigo-500 bg-indigo-100",
              "text-cyan-600 bg-cyan-100",
              "text-orange-500 bg-orange-100",
              "text-emerald-600 bg-emerald-100",
            ];
            const valueColors = [
              "text-indigo-700",
              "text-cyan-700",
              "text-orange-600",
              "text-emerald-700",
            ];
            return (
              <article
                key={label}
                className={`relative rounded-3xl border bg-gradient-to-br ${accents[i % 4]} p-7 flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconColors[i % 4]}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Value */}
                <div>
                  <p className={`text-5xl md:text-6xl font-black tracking-tight leading-none ${valueColors[i % 4]}`}>
                    {value}
                  </p>
                  <p className="mt-3 text-slate-600 text-sm font-medium leading-snug">
                    {label}
                  </p>
                </div>

                {/* Corner number */}
                <span className="absolute top-5 right-6 text-6xl font-black text-black/[0.04] leading-none pointer-events-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
