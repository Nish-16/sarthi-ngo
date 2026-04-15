import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Sparkles, ArrowRight } from "lucide-react";
import type { AboutHeroContent } from "@/types/content";

const IMAGE_CLIP_PRESETS = [
  "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
  "polygon(20% 0, 100% 0, 100% 100%, 5% 100%)",
] as const;

export default function AboutHero({ content }: { content: AboutHeroContent }) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 pt-28 pb-0">
      {/* blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* dot grids */}
      <div
        className="absolute top-24 left-8 w-36 h-36 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        className="absolute bottom-20 right-12 w-28 h-28 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* dashed rings */}
      <div className="absolute top-16 right-24 w-48 h-48 rounded-full border-2 border-dashed border-indigo-200/50 animate-float-slow pointer-events-none" />
      <div className="absolute bottom-28 left-16 w-20 h-20 rounded-full border-2 border-orange-200/60 animate-float pointer-events-none" />

      <Container className="relative z-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left: text */}
          <div className="flex flex-col gap-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              {content.badge}
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">
                  {content.headlineAccent}
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1.5 bg-orange-400 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              {content.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" href={content.ctaPrimaryHref}>
                <span>{content.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="lg" href={content.ctaSecondaryHref}>
                {content.ctaSecondary}
              </Button>
            </div>

            {/* trust signal */}
            <div className="flex items-center gap-6 pt-2">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl px-5 py-3 shadow-sm"
                >
                  <p className="text-2xl font-black text-indigo-600">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image slices */}
          <div className="relative flex items-center justify-center lg:justify-end h-[500px]">
            {/* image slices */}
            <div className="relative flex items-stretch h-[460px] w-full max-w-[480px]">
              {content.images.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-1"
                  style={{
                    clipPath: IMAGE_CLIP_PRESETS[i % IMAGE_CLIP_PRESETS.length],
                    marginLeft: i > 0 ? "-2.5rem" : "0",
                    zIndex: i + 1,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-indigo-900/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 10 0 40L0 60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
