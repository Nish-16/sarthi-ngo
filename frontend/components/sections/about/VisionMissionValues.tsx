"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { AboutVisionMissionValuesContent } from "@/types/content";

/* ─── Per-pillar light-theme style overrides ────────────────────────────── */
const PILLAR_STYLES = [
  {
    // Vision — wide, spans 2 cols
    wrapper: "lg:col-span-2",
    card: "bg-indigo-50 border-indigo-100",
    accentBar: "bg-gradient-to-r from-indigo-500 to-purple-500",
    tagColor: "text-indigo-500",
    numberColor: "text-indigo-500/8",
  },
  {
    // Mission — right column, full 2 rows tall
    wrapper: "lg:col-span-1 lg:row-span-2",
    card: "bg-orange-50 border-orange-100",
    accentBar: "bg-gradient-to-r from-orange-500 to-rose-500",
    tagColor: "text-orange-500",
    numberColor: "text-orange-500/8",
  },
  {
    // Values — wide, spans 2 cols, sits below Vision
    wrapper: "lg:col-span-2",
    card: "bg-cyan-50 border-cyan-100",
    accentBar: "bg-gradient-to-r from-cyan-500 to-teal-500",
    tagColor: "text-cyan-600",
    numberColor: "text-cyan-500/8",
  },
];

const PILLAR_ICON_BG = [
  "bg-gradient-to-r from-indigo-500 to-purple-500",
  "bg-gradient-to-r from-orange-500 to-rose-500",
  "bg-gradient-to-r from-cyan-500 to-teal-500",
];

export default function VisionMissionValues({
  content,
}: {
  content: AboutVisionMissionValuesContent;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24">
      {/* Blobs */}
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

      {/* Dot grid */}
      <div
        className="absolute bottom-10 left-6 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">
                  {content.headlineAccent}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-500 text-sm leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* ── Asymmetric bento grid ── */}
        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {content.pillars.map((pillar, i) => {
            const Icon = getIcon(pillar.iconName);
            const style = PILLAR_STYLES[i];
            const iconBg = PILLAR_ICON_BG[i % PILLAR_ICON_BG.length];

            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.15,
                  ease: "easeOut",
                }}
                className={`group relative ${style.wrapper}`}
              >
                <div
                  className={`
                    relative h-full rounded-3xl border p-8 overflow-hidden
                    shadow-xl shadow-slate-200/40
                    hover:shadow-2xl hover:-translate-y-1
                    transition-all duration-300
                    ${style.card}
                  `}
                >
                  {/* Large faint number */}
                  <span
                    className={`absolute top-4 right-5 text-8xl font-black select-none pointer-events-none leading-none ${style.numberColor}`}
                  >
                    0{i + 1}
                  </span>

                  <div className="relative z-10 flex flex-col gap-5 h-full">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center text-white shadow-lg shrink-0`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Tag + accent bar */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-1 w-14 rounded-full ${style.accentBar}`}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${style.tagColor}`}
                      >
                        {pillar.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-3">
                        {pillar.title}
                      </h3>
                      <p className="leading-relaxed text-slate-600 text-[15px] max-w-sm">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
