import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight, Handshake, Mic, Building2 } from "lucide-react";

const options = [
  {
    icon: Handshake,
    title: "CSR & Institutional Partnership",
    description:
      "Co-fund or co-design programs with full impact reporting, community access, and co-branding opportunities.",
    cta: "Explore Partnership",
    href: "/contact",
    color: "bg-white/15 border-white/20 hover:bg-white/20",
  },
  {
    icon: Building2,
    title: "School & College Collaboration",
    description:
      "Bring Sarthi programs to your institution — volunteer drives, leadership workshops, and field exposure for students.",
    cta: "Collaborate Now",
    href: "/contact",
    color: "bg-white/15 border-white/20 hover:bg-white/20",
  },
  {
    icon: Mic,
    title: "Invite Our Founders",
    description:
      "Book a speaker session for your event, campus, or corporate forum. We bring stories, data, and inspiration.",
    cta: "Send an Invite",
    href: "/contact",
    color: "bg-white/15 border-white/20 hover:bg-white/20",
  },
];

export default function CollaborateSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-100/30 blur-3xl" />

      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-10 md:p-16">

          {/* internal decorations */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-cyan-500/15 blur-2xl" />
          <div
            className="absolute top-8 right-8 w-28 h-28 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-dashed border-white/15 animate-float-slow pointer-events-none" />

          <div className="relative z-10">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
                Collaborate & Partner
              </p>
              <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Build something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  bigger together
                </span>
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed text-lg">
                We partner with institutions, corporates, and changemakers who share our
                commitment to community-led progress. Let's co-create something that lasts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {options.map(({ icon: Icon, title, description, cta, href, color }) => (
                <div
                  key={title}
                  className={`group rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300 ${color}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-extrabold text-white leading-snug">{title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
                  <div className="mt-5">
                    <Button href={href} variant="ghost" size="sm" className="text-cyan-300 hover:text-white hover:bg-white/10 px-0">
                      {cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
