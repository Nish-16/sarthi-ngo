import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight, Users, Handshake } from "lucide-react";
import type { GetInvolvedCollaborateContent } from "@/types/content";

export default function CollaborateSection({
  content,
}: {
  content: GetInvolvedCollaborateContent;
}) {
  return (
    <section
      id="collaborate"
      className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />
      <div
        className="absolute top-16 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-1 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">to impact</span>
                
              </span>
            </h2>

            <p className="mt-1 text-lg leading-relaxed text-slate-500">
              {content.tagline}
            </p>

            <div className="mt-7 space-y-4">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Closing pull-quote */}
            <blockquote className="mt-7 pl-5 border-l-4 border-indigo-300 bg-indigo-50 rounded-r-2xl py-4 pr-5">
              <p className="text-slate-700 leading-relaxed italic text-sm">
                {content.closingText}
              </p>
            </blockquote>

          </div>

          {/* Right: info panels */}
          <div className="flex flex-col gap-5 lg:pt-10">
            {/* Who can collaborate */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  Who can collaborate
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.collaboratorTypes.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* How to contribute */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Handshake className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  How you can contribute
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.contributionModes.map((mode) => (
                  <span
                    key={mode}
                    className="px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold border border-orange-100"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative stat / emphasis */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "At the intersection of expertise and purpose, collaboration becomes the most powerful tool for sustainable, socially just change."
              </p>
            </div>
            <div className="mt-1">
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
