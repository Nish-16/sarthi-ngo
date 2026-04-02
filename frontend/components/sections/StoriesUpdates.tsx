import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { StoriesUpdatesContent } from "@/types/content";

const categoryColors: Record<string, string> = {
  Story: "bg-indigo-100 text-indigo-700",
  Update: "bg-orange-100 text-orange-700",
  Event: "bg-emerald-100 text-emerald-700",
};

export default function StoriesUpdates({
  content,
}: {
  content: StoriesUpdatesContent;
}) {
  const [first, second, third, fourth] = content.items;

  return (
    <section id="stories" className="py-24 bg-slate-50 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-indigo-600">{content.headlineAccent}</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" href="#stories">
            {content.ctaLabel}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
          {/* Tall card */}
          {first && (
            <article className="group relative row-span-2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
              <Image
                src={first.image}
                alt={first.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[first.category] ?? "bg-slate-100 text-slate-700"}`}
                >
                  {first.category}
                </span>
                <p className="mt-2 text-white font-bold text-base leading-snug">
                  {first.title}
                </p>
              </div>
            </article>
          )}

          {/* Normal cards */}
          {[second, third].map((item, i) =>
            item ? (
              <article
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category] ?? "bg-slate-100 text-slate-700"}`}
                  >
                    {item.category}
                  </span>
                  <p className="mt-1.5 text-white font-semibold text-sm leading-snug">
                    {item.title}
                  </p>
                </div>
              </article>
            ) : null
          )}

          {/* Wide card */}
          {fourth && (
            <article className="group relative col-span-2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
              <Image
                src={fourth.image}
                alt={fourth.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 max-w-md">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[fourth.category] ?? "bg-slate-100 text-slate-700"}`}
                >
                  {fourth.category}
                </span>
                <p className="mt-2 text-white font-bold text-lg leading-snug">
                  {fourth.title}
                </p>
              </div>
            </article>
          )}
        </div>
      </Container>
    </section>
  );
}
