import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  Users,
  GraduationCap,
  UserPlus,
  Gift,
  Network,
  Mic,
  ArrowRight,
} from "lucide-react";

const featured = {
  id: "volunteer",
  icon: Users,
  title: "Volunteer",
  description:
    "Join our network of 1,200+ active volunteers and contribute your time to programs across 42 communities. No prior experience needed — just passion.",
  cta: "Apply Now",
  href: "#volunteer",
  image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80",
};

const cards = [
  {
    id: "intern",
    icon: GraduationCap,
    title: "Intern With Us",
    description:
      "Gain real-world experience in social impact. Work alongside field teams on live programs for 3–6 months.",
    cta: "Learn More",
    href: "#intern",
    accent: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-500",
    ctaVariant: "outline" as const,
  },
  {
    id: "member",
    icon: UserPlus,
    title: "Become a Member",
    description:
      "Get exclusive access to events, training workshops, and our growing alumni network of changemakers.",
    cta: "Join Now",
    href: "/contact",
    accent: "bg-purple-50 border-purple-100",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    ctaVariant: "outline" as const,
  },
  {
    id: "donate",
    icon: Gift,
    title: "Donate",
    description:
      "Every rupee funds a youth-led program. Your contribution directly expands our reach into underserved communities.",
    cta: "Contribute",
    href: "/contact",
    accent: "bg-orange-50 border-orange-100",
    iconBg: "bg-gradient-to-br from-orange-500 to-rose-500",
    ctaVariant: "secondary" as const,
  },
  {
    id: "collaborate",
    icon: Network,
    title: "Collaborate",
    description:
      "Partner with us as an organisation, school, or CSR initiative. Co-design programs that create mutual community impact.",
    cta: "Partner With Us",
    href: "/contact",
    accent: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    ctaVariant: "outline" as const,
  },
];

const InviteCard = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 text-white p-8 md:p-10">
    {/* inner decorations */}
    <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
    <div
      className="absolute bottom-4 right-8 w-24 h-24 opacity-10 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
        backgroundSize: "10px 10px",
      }}
    />
    <div className="absolute bottom-6 left-8 w-16 h-16 rounded-full border border-dashed border-white/20 animate-float-slow pointer-events-none" />

    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">Invite Our Founders</h3>
          <p className="mt-1.5 text-indigo-100 text-sm leading-relaxed max-w-xl">
            Invite our founders to speak at your college, corporate event, or community
            forum. We share stories, learnings, and insights from years of youth-led
            social impact work.
          </p>
        </div>
      </div>
      <Button href="/get-involved" variant="secondary" size="sm" className="shrink-0">
        Send an Invite
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

export default function InvolvementGrid() {
  const FeaturedIcon = featured.icon;

  return (
    <section id="get-involved-options" className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute -right-20 top-10 w-72 h-72 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />
      <div
        className="absolute top-12 left-4 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Ways to Join
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Choose your{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">role in change</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-500 text-sm leading-relaxed">
            Every contribution matters — pick the path that fits your time, skills, and goals.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-6 gap-5">
          {/* Featured Volunteer card */}
          <article className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[340px] group">
            <div className="absolute inset-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-900/40 to-slate-900/90" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-10 text-white">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-5">
                <FeaturedIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                Most Popular
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">{featured.title}</h3>
              <p className="mt-3 text-slate-200 leading-relaxed max-w-md text-sm md:text-base">
                {featured.description}
              </p>
              <div className="mt-6">
                <Button href={featured.href} variant="secondary" size="sm">
                  {featured.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>

          {/* Intern */}
          {(() => {
            const card = cards[0];
            const Icon = card.icon;
            return (
              <article key={card.id} className={`lg:col-span-2 group rounded-3xl border p-7 hover:shadow-xl hover:shadow-indigo-100/60 hover:-translate-y-1 transition-all duration-300 ${card.accent}`}>
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center text-white shadow-lg mb-6`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{card.description}</p>
                <div className="mt-6">
                  <Button href={card.href} variant={card.ctaVariant} size="sm">
                    {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </article>
            );
          })()}

          {/* Member, Donate, Collaborate */}
          {cards.slice(1).map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className={`lg:col-span-2 group rounded-3xl border p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 ${card.accent}`}
              >
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center text-white shadow-lg mb-6`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{card.description}</p>
                <div className="mt-6">
                  <Button href={card.href} variant={card.ctaVariant} size="sm">
                    {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </article>
            );
          })}

          {/* Invite Founders — full width */}
          <div className="lg:col-span-6">
            <InviteCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
