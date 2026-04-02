import Image from "next/image";
import Container from "@/components/ui/Container";
import { GraduationCap, Recycle, HeartPulse, BookOpen, ArrowUpRight } from "lucide-react";

const previousProjects = [
  {
    title: "Save Daughters",
    description:
      "Awareness and mentorship circles to improve access to education for girls in semi-urban schools.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    icon: GraduationCap,
    accent: "from-pink-500 to-rose-400",
    tag: "Education",
  },
  {
    title: "Save Environment",
    description:
      "Street-level campaigns for waste segregation, neighborhood composting, and community clean-ups.",
    image:
      "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=1200&q=80",
    icon: Recycle,
    accent: "from-emerald-500 to-teal-400",
    tag: "Environment",
  },
  {
    title: "Health on Wheels",
    description:
      "Mobile health check-up camps in underserved pockets with youth volunteers and local clinics.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80",
    icon: HeartPulse,
    accent: "from-red-500 to-orange-400",
    tag: "Healthcare",
  },
  {
    title: "Skills for Youth",
    description:
      "Career readiness bootcamps focused on communication, digital literacy, and interview readiness.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    icon: BookOpen,
    accent: "from-indigo-500 to-purple-400",
    tag: "Livelihoods",
  },
] as const;

export default function PreviousProjects() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-100/30 blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute bottom-12 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Our Previous Projects
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Programs that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                shaped our journey
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 leading-relaxed text-sm md:text-base">
            These initiatives taught us what sustainable impact requires: local
            trust, long-term engagement, and youth ownership.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {previousProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                className={`group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 1 ? "xl:translate-y-10" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                  {/* tag badge */}
                  <span className="absolute top-4 left-4 text-xs font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>

                <div className="p-6">
                  {/* icon */}
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-white shadow-md mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-indigo-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
