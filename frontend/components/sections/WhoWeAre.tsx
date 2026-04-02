import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { WhoWeAreContent } from "@/types/content";

export default function WhoWeAre({ content }: { content: WhoWeAreContent }) {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-[480px] shadow-2xl shadow-indigo-500/10">
              <Image
                src={content.mainImage}
                alt={content.mainImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-3xl font-black text-indigo-600">
                  {content.yearsValue}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {content.yearsLabel}
                </p>
              </div>
            </div>

            <div
              className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
              }}
            >
              <Image
                src={content.secondaryImage}
                alt={content.secondaryImageAlt}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-orange-400/20 animate-float pointer-events-none" />
            <div className="absolute top-1/2 -right-3 w-12 h-12 rounded-full bg-indigo-300/30 animate-float-slow pointer-events-none" />
            <div
              className="absolute -top-4 right-16 w-32 h-32 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-6 lg:pl-6">
            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
              {content.eyebrow}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-indigo-600">{content.headlineAccent}</span>{" "}
              rewriting the future
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed">
              {content.description1}
            </p>

            <p className="text-slate-500 leading-relaxed">
              {content.description2}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {content.values.map((v) => (
                <span
                  key={v}
                  className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full"
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Button variant="outline" size="md" href="#about">
                {content.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
