import Container from "../ui/Container";
import type { RecognitionsContent } from "@/types/content";

export default function Recognitions({
  content,
}: {
  content: RecognitionsContent;
}) {
  return (
    <section className="py-20 bg-slate-50/70 overflow-hidden">
      <Container>
        <div className="text-center mb-14">
          <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-black text-slate-900">
            {content.headline}{" "}
            <span className="text-indigo-600">{content.headlineAccent}</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Logo belt */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {content.organizations.map((org) => (
            <div
              key={org.name}
              className="group flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-sm shadow-indigo-300/30 group-hover:scale-105 transition-transform">
                {org.abbr.slice(0, 2)}
              </div>
              <span className="text-slate-600 font-semibold text-sm group-hover:text-indigo-700 transition-colors">
                {org.name}
              </span>
            </div>
          ))}
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {content.awards.map((award) => (
            <div
              key={award.title}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center group"
            >
              <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform inline-block">
                {award.icon}
              </span>
              <p className="text-sm font-bold text-slate-800 leading-tight">
                {award.title}
              </p>
              <span className="mt-2 inline-block text-xs text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
