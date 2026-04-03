import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { AboutSharedLeadershipContent } from "@/types/content";

export default function SharedLeadershipBlock({
  content,
}: {
  content: AboutSharedLeadershipContent;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* outer blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-100/30 blur-3xl" />

      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 text-white p-10 md:p-16 shadow-2xl shadow-indigo-300/40">
          {/* internal decorations */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-cyan-400/20 blur-2xl" />
          <div
            className="absolute top-8 right-8 w-28 h-28 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-dashed border-white/20 animate-float-slow pointer-events-none" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-100">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {content.headline},{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                  {content.headlineAccent}
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-indigo-100 max-w-lg">
                {content.description}
              </p>
              <div className="mt-8">
                <Button href={content.ctaHref} variant="secondary" size="lg">
                  {content.cta}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Principles grid */}
            <div className="grid grid-cols-2 gap-4">
              {content.principles.map((principle) => {
                const Icon = getIcon(principle.iconName);
                return (
                  <div
                    key={principle.label}
                    className={`rounded-2xl border backdrop-blur-sm p-5 flex flex-col gap-3 hover:bg-white/10 transition-colors duration-300 ${principle.color}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${principle.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {principle.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
