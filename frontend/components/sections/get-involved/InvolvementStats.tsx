import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import { hexToRgba, isHexColor } from "@/lib/color";
import type { GetInvolvedStatsContent } from "@/types/content";

export default function InvolvementStats({
  content,
}: {
  content: GetInvolvedStatsContent;
}) {
  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-indigo-900/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-900/40 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute bottom-12 left-10 w-24 h-24 rounded-full border border-dashed border-white/10 animate-float-slow pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {content.headline}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-indigo-300">
              {content.headlineAccent}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {content.items.map((stat) => {
            const Icon = getIcon(stat.iconName);
            const statColor = stat.gradient.trim();
            const useHexStatColor = isHexColor(statColor);
            const iconBoxColor = stat.iconColor.trim();
            const useHexIconColor = isHexColor(iconBoxColor);
            return (
              <article
                key={stat.label}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${useHexStatColor ? "" : `bg-linear-to-r ${stat.gradient}`}`}
                  style={
                    useHexStatColor
                      ? {
                          backgroundImage: `linear-gradient(to right, ${statColor}, ${hexToRgba(statColor, 0.15)})`,
                        }
                      : undefined
                  }
                />

                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mx-auto mb-4 ${useHexIconColor ? "" : stat.iconColor}`}
                  style={
                    useHexIconColor
                      ? {
                          color: iconBoxColor,
                          backgroundColor: hexToRgba(iconBoxColor, 0.15),
                          borderColor: hexToRgba(iconBoxColor, 0.3),
                        }
                      : undefined
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-4xl lg:text-5xl font-black leading-none mb-2 ${useHexStatColor ? "" : `text-transparent bg-clip-text bg-linear-to-br ${stat.gradient}`}`}
                  style={useHexStatColor ? { color: statColor } : undefined}
                >
                  {stat.value}
                </p>
                <p className="text-white font-bold text-base">{stat.label}</p>
                <p className="text-slate-400 text-xs mt-1 leading-snug">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
