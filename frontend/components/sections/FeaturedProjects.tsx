import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { FeaturedProjectsContent } from "@/types/content";

export default function FeaturedProjects({
  content,
}: {
  content: FeaturedProjectsContent;
}) {
  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
              {content.eyebrow}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-indigo-600">{content.headlineAccent}</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" href="#projects">
            {content.ctaLabel}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {content.projects.map((project, i) => (
            <article
              key={i}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100/80"
            >
              <div
                className="relative h-56 overflow-hidden"
                style={{ clipPath: project.clipPath }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
              </div>

              <div className="p-6 flex flex-col gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${project.tagColor}`}
                >
                  {project.tag}
                </span>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 py-3 border-t border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">
                    {project.stat}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start -ml-2 group-hover:text-indigo-600"
                >
                  Know More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
