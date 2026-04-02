import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight, Users, Leaf } from "lucide-react";

const initiatives = [
  {
    name: "Abhivyakti",
    tagline: "Youth Expression Lab",
    description:
      "A youth expression and leadership lab where students build confidence through storytelling, debate circles, and community journalism.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
    clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
    accent: "from-indigo-600/80 to-sky-500/60",
    icon: Users,
    color: "indigo",
  },
  {
    name: "Sustainisha",
    tagline: "Green Action Program",
    description:
      "An action program helping neighborhoods reduce waste, adopt climate-smart habits, and co-create local green infrastructure.",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1400&q=80",
    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
    accent: "from-emerald-600/75 to-teal-500/60",
    icon: Leaf,
    color: "emerald",
  },
] as const;

export default function ProjectsSection() {
  const [primary, secondary] = initiatives;
  const PrimaryIcon = primary.icon;
  const SecondaryIcon = secondary.icon;

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute -right-20 top-8 w-72 h-72 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute top-16 left-4 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Signature Projects
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Initiatives built for{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">local realities</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-500 leading-relaxed text-sm md:text-base">
            Each program is designed with communities, not for them.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Primary card */}
          <article className="lg:col-span-7 relative rounded-3xl bg-slate-900 text-white overflow-hidden min-h-[440px] group">
            <div className="absolute inset-0">
              <Image
                src={primary.image}
                alt={primary.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15,23,42,0.15), rgba(15,23,42,0.88))",
                  clipPath: primary.clipPath,
                }}
              />
            </div>

            {/* tag */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <PrimaryIcon className="w-3.5 h-3.5" />
              {primary.tagline}
            </div>

            <div className="relative h-full flex flex-col justify-end p-8 md:p-10 pt-20">
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                {primary.name}
              </h3>
              <p className="mt-4 text-slate-200 leading-relaxed max-w-xl">
                {primary.description}
              </p>
              <div className="mt-7">
                <Button href="/get-involved" variant="secondary" size="sm">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>

          {/* Secondary card */}
          <article className="lg:col-span-5 relative lg:mt-14 rounded-3xl bg-white border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 group">
            <div className="relative h-60 overflow-hidden">
              <Image
                src={secondary.image}
                alt={secondary.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${secondary.accent}`}
                style={{ clipPath: secondary.clipPath }}
              />
              {/* tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                <SecondaryIcon className="w-3.5 h-3.5" />
                {secondary.tagline}
              </div>
            </div>

            <div className="p-7 md:p-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {secondary.name}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {secondary.description}
              </p>
              <div className="mt-6">
                <Button href="/get-involved" variant="outline" size="sm">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
