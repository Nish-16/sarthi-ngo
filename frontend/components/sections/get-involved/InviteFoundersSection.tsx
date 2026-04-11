import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import type { GetInvolvedInviteFoundersContent } from "@/types/content";

const KEYWORD_COLORS = [
  "bg-indigo-50 text-indigo-700 border-indigo-100",
  "bg-orange-50 text-orange-700 border-orange-100",
  "bg-cyan-50 text-cyan-700 border-cyan-100",
  "bg-emerald-50 text-emerald-700 border-emerald-100",
  "bg-purple-50 text-purple-700 border-purple-100",
];

export default function InviteFoundersSection({
  content,
}: {
  content: GetInvolvedInviteFoundersContent;
}) {
  return (
    <section
      id="invite-founders"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-16 left-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
            {content.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {content.headline}
          </h2>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: quote + body */}
          <div>
            {/* Quote block — light */}
            <div className="relative rounded-2xl bg-indigo-50 border border-indigo-100 p-7">
              <span
                className="absolute -top-5 left-6 text-8xl font-black text-indigo-200 leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </span>
              <p className="relative pt-4 text-slate-800 text-lg font-semibold leading-relaxed italic">
                {content.quote}
              </p>
            </div>

            <h3 className="mt-8 text-lg font-extrabold text-slate-900">
              {content.subheadline}
            </h3>

            <div className="mt-4 space-y-4">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            
          </div>

          {/* Right: keywords panel */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 shadow-sm p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
              Key focus areas
            </p>
            <div className="flex flex-wrap gap-2.5">
              {content.keywords.map((kw, i) => (
                <span
                  key={kw}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${KEYWORD_COLORS[i % KEYWORD_COLORS.length]}`}
                >
                  {kw}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-relaxed">
                Sessions are tailored to your audience — students, educators, or young professionals navigating their purpose-driven path.
              </p>
            </div>
            <div className="mt-5">
              <Button href={content.ctaHref} size="lg">
                {content.ctaLabel}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
