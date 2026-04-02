import Container from "../ui/Container";
import Button from "../ui/Button";
import type { JoinUsContent } from "@/types/content";

export default function JoinUs({ content }: { content: JoinUsContent }) {
  return (
    <section id="join" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 px-8 md:px-16 py-20 text-center shadow-2xl shadow-indigo-900/30">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-8 right-12 w-32 h-32 bg-orange-400/10 rounded-full blur-xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="absolute top-10 left-16 text-3xl animate-float opacity-60 pointer-events-none">
            ✊
          </div>
          <div className="absolute bottom-10 right-20 text-3xl animate-float-slow opacity-60 pointer-events-none">
            🌱
          </div>
          <div className="absolute top-1/2 left-8 text-2xl animate-float opacity-40 pointer-events-none">
            💡
          </div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest">
              {content.eyebrow}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {content.headline}{" "}
              <span className="text-orange-300">{content.headlineAccent}</span>{" "}
              in your community?
            </h2>

            <p className="text-indigo-200 text-lg leading-relaxed">
              {content.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button variant="secondary" size="lg">
                {content.ctaPrimary}
              </Button>
              <a
                href={content.ctaSecondaryHref}
                className="text-white font-semibold hover:text-orange-300 transition-colors underline underline-offset-4 text-base"
              >
                {content.ctaSecondary}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-white/10 w-full">
              {content.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-indigo-200 text-sm font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
