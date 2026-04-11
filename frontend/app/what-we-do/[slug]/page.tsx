import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { readShared, readWhatWeDo } from "@/lib/content";
import { getIcon } from "@/lib/icon-map";
import type {
  WwdInitiativeItem,
  WwdPreviousProjectItem,
} from "@/types/content";

export const revalidate = 3600;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type ProjectData =
  | ({ type: "signature" } & WwdInitiativeItem)
  | ({ type: "previous" } & WwdPreviousProjectItem);

export async function generateStaticParams() {
  const wwd = await readWhatWeDo();
  const slugs: { slug: string }[] = [];
  for (const item of wwd.signatureProjects.initiatives) {
    if (item.name) slugs.push({ slug: toSlug(item.name) });
  }
  for (const item of wwd.previousProjects.projects) {
    if (item.title) slugs.push({ slug: toSlug(item.title) });
  }
  return slugs;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [shared, wwd] = await Promise.all([readShared(), readWhatWeDo()]);

  let project: ProjectData | null = null;

  for (const item of wwd.signatureProjects.initiatives) {
    if (toSlug(item.name) === slug) {
      project = { type: "signature", ...item };
      break;
    }
  }
  if (!project) {
    for (const item of wwd.previousProjects.projects) {
      if (toSlug(item.title) === slug) {
        project = { type: "previous", ...item };
        break;
      }
    }
  }
  if (!project) notFound();

  const name = project.type === "signature" ? project.name : project.title;
  const tagline = project.type === "signature" ? project.tagline : project.tag;
  const Icon = getIcon(project.iconName);
  const hasContent = project.problem || project.whatWeDo || project.ourWork;

  return (
    <>
      <Navbar content={shared.navbar} />
      <main className="flex flex-col flex-1 bg-slate-50">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-slate-950">
          {/* Full-bleed background image */}
          {project.image && (
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/75 to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

          {/* Floating back button */}
          <div className="absolute top-24 left-0 right-0 z-20">
            <Container>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:bg-white/15 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Projects
              </Link>
            </Container>
          </div>

          {/* Hero content */}
          <Container className="relative z-10 pb-14 pt-40">
            <div className="max-w-4xl">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full">
                  <Icon className="w-3.5 h-3.5" />
                  {tagline}
                </div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  {project.type === "signature"
                    ? "Signature Initiative"
                    : "Past Initiative"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5">
                {name}
              </h1>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </Container>

          {/* Bottom edge blur */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
        </section>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        {hasContent ? (
          <Container className="relative z-10 -mt-1 pb-24">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
              {/* ── LEFT: sections ── */}
              <div className="flex flex-col gap-6">
                {/* Problem */}
                {project.problem && (
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-500">
                    {/* Accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400" />
                    <div className="p-8 md:p-10">
                      {/* Section label */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                          <span className="text-rose-600 font-black text-sm leading-none">
                            !
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500 mb-0.5">
                            The Challenge
                          </p>
                          <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            Problem
                          </h2>
                        </div>
                      </div>

                      <div className="pl-12">
                        {(() => {
                          const lines = project
                            .problem!.split("\n")
                            .filter((l) => l.trim());
                          // Collect consecutive bullet lines into groups
                          const blocks: {
                            type: "para" | "bullets";
                            items: string[];
                          }[] = [];
                          for (const line of lines) {
                            const isBullet = /^[-•*]\s+/.test(line.trim());
                            const text = isBullet
                              ? line.trim().replace(/^[-•*]\s+/, "")
                              : line.trim();
                            if (isBullet) {
                              const last = blocks[blocks.length - 1];
                              if (last?.type === "bullets") {
                                last.items.push(text);
                              } else {
                                blocks.push({ type: "bullets", items: [text] });
                              }
                            } else {
                              blocks.push({ type: "para", items: [text] });
                            }
                          }
                          return blocks.map((block, bi) =>
                            block.type === "para" ? (
                              <p
                                key={bi}
                                className="text-sm md:text-[15px] text-slate-600 leading-[1.75] mb-4"
                              >
                                {block.items[0]}
                              </p>
                            ) : (
                              <ul key={bi} className="mb-4 space-y-2.5">
                                {block.items.map((item, ii) => (
                                  <li
                                    key={ii}
                                    className="flex items-start gap-3"
                                  >
                                    <span className="mt-[5px] w-5 h-5 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 block" />
                                    </span>
                                    <span className="text-sm md:text-[15px] text-slate-600 leading-[1.75]">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ),
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* What We Do */}
                {project.whatWeDo && (
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-500">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500" />
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-0.5">
                            Our Intervention
                          </p>
                          <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            What We Do
                          </h2>
                        </div>
                      </div>

                      <div className="pl-12">
                        {(() => {
                          const lines = project.whatWeDo!.split("\n").filter((l) => l.trim());
                          const blocks: { type: "para" | "bullets"; items: string[] }[] = [];
                          for (const line of lines) {
                            const isBullet = /^[-•*]\s+/.test(line.trim());
                            const text = isBullet ? line.trim().replace(/^[-•*]\s+/, "") : line.trim();
                            if (isBullet) {
                              const last = blocks[blocks.length - 1];
                              if (last?.type === "bullets") { last.items.push(text); }
                              else { blocks.push({ type: "bullets", items: [text] }); }
                            } else {
                              blocks.push({ type: "para", items: [text] });
                            }
                          }
                          return blocks.map((block, bi) =>
                            block.type === "para" ? (
                              <div key={bi} className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 mb-4">
                                <p className="text-sm md:text-[15px] text-indigo-800 font-semibold leading-relaxed">
                                  {block.items[0]}
                                </p>
                              </div>
                            ) : (
                              <ul key={bi} className="mb-4 space-y-2.5">
                                {block.items.map((item, ii) => (
                                  <li key={ii} className="flex items-start gap-3">
                                    <span className="mt-[5px] w-5 h-5 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 block" />
                                    </span>
                                    <span className="text-sm md:text-[15px] text-slate-600 leading-[1.75]">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Our Work */}
                {project.ourWork && (
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-500">
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="text-emerald-600 text-base leading-none">
                            ✦
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-0.5">
                            On the Ground
                          </p>
                          <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            Our Work
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-4 pl-12">
                        {project.ourWork.split("\n").map((para, i) =>
                          para.trim() ? (
                            <p
                              key={i}
                              className="text-sm md:text-[15px] text-slate-600 leading-[1.75]"
                            >
                              {para}
                            </p>
                          ) : null,
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT: sticky sidebar ── */}
              <div className="lg:sticky lg:top-8 flex flex-col gap-5">
                {/* Project info card */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  {/* Mini image */}
                  {project.image && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={project.image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-white text-xs font-semibold">
                          {tagline}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-base font-black text-slate-900 tracking-tight mb-1">
                      {name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          project.type === "signature"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {project.type === "signature"
                          ? "Signature Initiative"
                          : "Past Initiative"}
                      </span>
                    </div>

                    {/* Metadata rows */}
                    <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs">Youth-led initiative</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs">India</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs">Ongoing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA card */}
                <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl overflow-hidden p-6 text-white">
                  {/* Blob */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2">
                    Get Involved
                  </p>
                  <h3 className="text-base font-black tracking-tight leading-snug mb-3">
                    Want to be part of this work?
                  </h3>
                  <p className="text-xs text-indigo-200 leading-relaxed mb-5">
                    Volunteer, intern, or collaborate with us to create impact
                    on the ground.
                  </p>
                  <Button
                    href="/get-involved"
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Join Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Back link */}
                <Link
                  href="/what-we-do"
                  className="flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 text-xs font-semibold py-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all duration-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  See all projects
                </Link>
              </div>
            </div>
          </Container>
        ) : (
          /* Coming-soon state */
          <Container className="py-24">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-indigo-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-3">
                Content Coming Soon
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Detailed information about this project is being prepared. Check
                back soon or get in touch with us.
              </p>
              <Button href="/get-involved" size="sm">
                Get Involved
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Container>
        )}

        {/* ── BOTTOM CTA BAND ──────────────────────────────────────── */}
        {hasContent && (
          <section className="relative overflow-hidden bg-slate-950 py-20">
            {/* blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
            {/* dot grid */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <Container className="relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3">
                  Make a difference
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                  Ready to create{" "}
                  <span className="relative inline-block">
                    <span className="text-indigo-400">real impact?</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-500 rounded-full" />
                  </span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  Join a community of young changemakers volunteering,
                  interning, and collaborating to build a better India.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button href="/get-involved" size="md">
                    Get Involved
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    href="/what-we-do"
                    variant="ghost"
                    size="md"
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    See All Projects
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer content={shared.footer} />
    </>
  );
}
