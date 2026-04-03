import Container from "@/components/ui/Container";
import { getIcon } from "@/lib/icon-map";
import type { AboutRecognitionContent } from "@/types/content";

export default function Recognition({
  content,
}: {
  content: AboutRecognitionContent;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-slate-100">
      {/* blobs */}
      <div className="pointer-events-none absolute left-8 top-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-6 bottom-4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* dot grid */}
      <div
        className="absolute top-10 right-10 w-36 h-36 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #67e8f9 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* dashed ring */}
      <div className="absolute bottom-16 left-12 w-28 h-28 rounded-full border border-dashed border-white/10 animate-float-slow pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                {content.headlineAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-400 text-sm leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.blocks.map((block) => {
            const Icon = getIcon(block.iconName);
            return (
              <article
                key={block.title}
                className={`rounded-2xl border border-white/8 border-l-2 p-6 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300 ${block.accent}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${block.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  {block.title}
                </h3>
                <ul className="space-y-2.5 text-sm leading-relaxed text-slate-400">
                  {block.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5 items-start">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* partner logos strip */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
            {content.partnerEyebrow}
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {content.partnerLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-14 items-center justify-center rounded-2xl border border-white/8 bg-white/4 text-sm font-black tracking-widest text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
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
