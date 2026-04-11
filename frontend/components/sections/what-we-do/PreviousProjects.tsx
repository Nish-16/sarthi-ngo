import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { WwdPreviousProjectsContent } from "@/types/content";

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

interface Props {
  content: WwdPreviousProjectsContent;
}

export default function PreviousProjects({ content }: Props) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-100/30 blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute bottom-12 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {content.headlineAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 leading-relaxed text-sm md:text-base">
            {content.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {content.projects.map((project, index) => {
            const Icon = getIcon(project.iconName);
            return (
              <Link
                key={project.title}
                href={`/what-we-do/${toSlug(project.title)}`}
                className={`block group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 1 ? "xl:translate-y-10" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-white shadow-md mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{project.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-indigo-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
