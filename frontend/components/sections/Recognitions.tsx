import Container from "../ui/Container";
import { Trophy, Star, Award, Gem } from "lucide-react";
import type { RecognitionsContent } from "@/types/content";

const awardIcons = [Trophy, Star, Award, Gem];
const awardColors = [
  "bg-amber-50 text-amber-500",
  "bg-indigo-50 text-indigo-500",
  "bg-cyan-50 text-cyan-500",
  "bg-purple-50 text-purple-500",
];

const defaultOrgLogos: Record<string, string> = {
  "NITI Aayog": "https://logo.clearbit.com/niti.gov.in",
  "Youth Ki Awaaz": "https://logo.clearbit.com/youthkiawaaz.com",
  "Ashoka Changemakers": "https://logo.clearbit.com/ashoka.org",
  "UN Youth India": "https://logo.clearbit.com/un.org",
  "Forbes 30U30": "https://logo.clearbit.com/forbes.com",
};

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

        {/* Logo belt — infinite marquee */}
        <div className="relative mb-14 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-6 items-center">
            {[...content.organizations, ...content.organizations].map(
              (org, i) => {
                const logoSrc = org.logo?.trim() || defaultOrgLogos[org.name];

                return (
                  <div
                    key={`${org.name}-${i}`}
                    className="group flex flex-col items-center justify-start px-3 py-2 transition-all duration-300 cursor-default shrink-0 min-w-40"
                  >
                    <div className="w-24 h-24 mx-auto flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={`${org.name} logo`}
                          className="w-20 h-20 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white text-sm font-black shadow-sm shadow-indigo-300/30">
                          {org.abbr.slice(0, 3)}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-center text-[11px] leading-tight text-slate-500 font-medium group-hover:text-indigo-700 transition-colors">
                      {org.name}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {content.awards.map((award, i) => {
            const Icon = awardIcons[i % awardIcons.length];
            const color = awardColors[i % awardColors.length];
            return (
              <div
                key={award.title}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-800 leading-tight">
                  {award.title}
                </p>
                <span className="mt-2 inline-block text-xs text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full">
                  {award.year}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
