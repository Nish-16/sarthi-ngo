"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { AboutRecognitionContent } from "@/types/content";

/* ─── Node card ─────────────────────────────────────────────────────────── */

interface NodeProps {
  title: string;
  iconName: string;
  accent: string;
  iconColor: string;
  details: string[];
  index: number;
  inView: boolean;
}

function RecognitionNode({ title, iconName, accent, iconColor, details, index, inView }: NodeProps) {
  const Icon = getIcon(iconName);

  return (
    <motion.article
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.12, ease: "easeOut" }}
      className={`
        group relative rounded-2xl border border-slate-200 border-l-2 p-5
        bg-white shadow-sm shadow-slate-100
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-300
        ${accent}
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
          <ul className="space-y-1.5">
            {details.map((detail) => (
              <li key={detail} className="flex gap-2 items-start text-xs text-slate-500 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── SVG connecting lines (desktop only) ───────────────────────────────── */

function ConnectionLines({ count, animate }: { count: number; animate: boolean }) {
  // Y positions (as % of SVG height) for each node midpoint
  const nodeYs = [10, 26, 44, 63, 80].slice(0, count);

  return (
    <svg
      className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lgLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Anchor dot */}
      <motion.circle
        cx="50%" cy="50%"
        r="4"
        fill="#6366f1"
        initial={{ opacity: 0, scale: 0 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.25 }}
      />

      {nodeYs.map((yPct, i) => (
        <motion.path
          key={i}
          d={`M 50% 50% C 50% ${yPct}%, 50% ${yPct}%, 100% ${yPct}%`}
          fill="none"
          stroke="url(#lgLine)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────── */

export default function Recognition({ content }: { content: AboutRecognitionContent }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 py-24"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-4 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />

      {/* Dot grid */}
      <div
        className="absolute top-10 right-10 w-36 h-36 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />
      {/* Dashed ring */}
      <div className="absolute bottom-16 left-12 w-28 h-28 rounded-full border-2 border-dashed border-indigo-200/60 animate-float-slow pointer-events-none" />

      <Container className="relative z-10">
        {/* ── DESKTOP: 3-col (left | connector | right) | MOBILE: stacked ── */}
        <div className="relative flex flex-col gap-10 lg:grid lg:grid-cols-[2fr_0.6fr_3fr] lg:gap-0 lg:items-center">

          {/* LEFT — anchor */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:pr-4"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">{content.headlineAccent}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
            <p className="mt-5 text-slate-500 text-sm leading-relaxed max-w-xs">
              {content.description}
            </p>

            {/* Partner logos — desktop */}
            <div className="mt-10 hidden lg:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-3">
                {content.partnerEyebrow}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.partnerLogos.map((logo, i) => (
                  <motion.div
                    key={logo}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.85 + i * 0.07 }}
                    className="h-9 px-3 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-black tracking-widest text-slate-500 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200"
                  >
                    {logo}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CENTER — SVG lines */}
          <div className="relative hidden lg:block h-full min-h-[360px]" aria-hidden="true">
            <ConnectionLines count={content.blocks.length} animate={inView} />
          </div>

          {/* RIGHT — nodes */}
          <div className="flex flex-col gap-3">
            {content.blocks.map((block, i) => (
              <RecognitionNode key={block.title} {...block} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Partner logos — mobile */}
        <div className="mt-10 lg:hidden border-t border-slate-100 pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-4">
            {content.partnerEyebrow}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {content.partnerLogos.map((logo) => (
              <div
                key={logo}
                className="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-black tracking-widest text-slate-500 shadow-sm"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
