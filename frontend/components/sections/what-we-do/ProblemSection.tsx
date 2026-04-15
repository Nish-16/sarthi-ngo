import Image from "next/image";
import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { WwdProblemContent } from "@/types/content";

function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{6})$/.test(value.trim());
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Props {
  content: WwdProblemContent;
}

export default function ProblemSection({ content }: Props) {
  return (
    <section className="relative py-24 overflow-hidden bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
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
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              {content.description1}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed text-lg">
              {content.description2}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {content.gaps.map(({ iconName, label, color }) => {
                const Icon = getIcon(iconName);
                const normalizedColor = color.trim();
                const useHexStyle = isHexColor(normalizedColor);
                return (
                  <div
                    key={label}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${useHexStyle ? "" : normalizedColor}`}
                    style={
                      useHexStyle
                        ? {
                            color: normalizedColor,
                            backgroundColor: hexToRgba(normalizedColor, 0.1),
                            border: `1px solid ${hexToRgba(normalizedColor, 0.35)}`,
                          }
                        : undefined
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="absolute -left-5 -top-5 w-full h-full rounded-3xl border-2 border-dashed border-indigo-200/60"
              aria-hidden="true"
            />
            <div
              className="absolute -right-3 -bottom-3 w-3/4 h-3/4 rounded-3xl border-2 border-dashed border-orange-200/50"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden min-h-90 md:min-h-110 shadow-2xl shadow-slate-300/40">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-slate-900/10 via-transparent to-slate-900/50" />
            </div>

            <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 animate-float pointer-events-none">
              <p className="text-xs text-slate-400 font-medium">
                {content.statLabel}
              </p>
              <p className="text-3xl font-black text-indigo-600 mt-0.5">
                {content.statValue}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
