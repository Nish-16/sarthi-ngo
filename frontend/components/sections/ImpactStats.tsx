import Container from "../ui/Container";
import { GraduationCap, Users, MapPin, Heart } from "lucide-react";
import { hexToRgba, isHexColor } from "@/lib/color";
import type { ImpactStatsContent } from "@/types/content";

const statIcons = [GraduationCap, Users, MapPin, Heart];

export default function ImpactStats({
  content,
}: {
  content: ImpactStatsContent;
}) {
  return (
    <section
      id="impact"
      className="py-24 bg-slate-900 overflow-hidden relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-black text-white leading-tight">
            {content.headline}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              {content.headlineAccent}
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {content.stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            const statColor = stat.gradient.trim();
            const useHex = isHexColor(statColor);
            return (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${useHex ? "" : `bg-linear-to-r ${stat.gradient}`}`}
                  style={
                    useHex
                      ? {
                          backgroundImage: `linear-gradient(to right, ${statColor}, ${hexToRgba(statColor, 0.15)})`,
                        }
                      : undefined
                  }
                />
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${useHex ? "" : `bg-linear-to-br ${stat.gradient} text-white`}`}
                  style={
                    useHex
                      ? {
                          backgroundColor: hexToRgba(statColor, 0.2),
                          color: statColor,
                        }
                      : undefined
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-2xl lg:text-6xl font-black leading-none mb-2 ${useHex ? "" : `text-transparent bg-clip-text bg-linear-to-br ${stat.gradient}`}`}
                  style={useHex ? { color: statColor } : undefined}
                >
                  {stat.value}
                </p>
                <p className="text-white font-bold text-lg">{stat.label}</p>
                <p className="text-slate-400 text-sm mt-1">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-500 text-sm mt-10">
          {content.footnote}
        </p>
      </Container>
    </section>
  );
}
