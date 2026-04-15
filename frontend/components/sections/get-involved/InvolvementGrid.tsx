import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight, Mic } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import { hexToRgba, isHexColor } from "@/lib/color";
import type { GetInvolvedGridContent } from "@/types/content";

function InviteCard({
  title,
  description,
  cta,
  href,
}: {
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-700 via-indigo-600 to-cyan-600 text-white p-8 md:p-10">
      {/* inner decorations */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-4 right-8 w-24 h-24 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1.5px, transparent 1.5px)",
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
            <h3 className="text-xl font-black tracking-tight">{title}</h3>
            <p className="mt-1.5 text-indigo-100 text-sm leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
        <Button href={href} variant="secondary" size="sm" className="shrink-0">
          {cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function InvolvementGrid({
  content,
}: {
  content: GetInvolvedGridContent;
}) {
  const FeaturedIcon = getIcon(content.featured.iconName);
  const primaryCard = content.cards[0];
  const secondaryCards = content.cards.slice(1);

  return (
    <section
      id="get-involved-options"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* blobs */}
      <div className="absolute -right-20 top-10 w-72 h-72 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />
      <div
        className="absolute top-12 left-4 w-32 h-32 opacity-20 pointer-events-none"
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
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {content.headline}{" "}
              <span className="relative inline-block">
                <span className="text-indigo-600">
                  {content.headlineAccent}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-500 text-sm leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-6 gap-5">
          {/* Featured Volunteer card */}
          <article className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-85 group">
            <div className="absolute inset-0">
              <Image
                src={content.featured.image}
                alt={content.featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-slate-900/20 via-slate-900/40 to-slate-900/90" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-10 text-white">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-5">
                <FeaturedIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                {content.featured.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                {content.featured.title}
              </h3>
              <p className="mt-3 text-slate-200 leading-relaxed max-w-md text-sm md:text-base">
                {content.featured.description}
              </p>
              <div className="mt-6">
                <Button
                  href={content.featured.href}
                  variant="secondary"
                  size="sm"
                >
                  {content.featured.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>

          {/* Intern */}
          {primaryCard &&
            (() => {
              const Icon = getIcon(primaryCard.iconName);
              const primaryAccent = primaryCard.accent.trim();
              const usePrimaryHexAccent = isHexColor(primaryAccent);
              const primaryIconBg = primaryCard.iconBg.trim();
              const usePrimaryHexIconBg = isHexColor(primaryIconBg);
              return (
                <article
                  key={primaryCard.title}
                  className={`lg:col-span-2 group rounded-3xl border p-7 hover:shadow-xl hover:shadow-indigo-100/60 hover:-translate-y-1 transition-all duration-300 ${usePrimaryHexAccent ? "" : primaryCard.accent}`}
                  style={
                    usePrimaryHexAccent
                      ? {
                          backgroundColor: hexToRgba(primaryAccent, 0.12),
                          borderColor: hexToRgba(primaryAccent, 0.35),
                        }
                      : undefined
                  }
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 ${usePrimaryHexIconBg ? "" : primaryCard.iconBg}`}
                    style={
                      usePrimaryHexIconBg
                        ? {
                            backgroundColor: primaryIconBg,
                          }
                        : undefined
                    }
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {primaryCard.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {primaryCard.description}
                  </p>
                  <div className="mt-6">
                    <Button
                      href={primaryCard.href}
                      variant={primaryCard.ctaVariant}
                      size="sm"
                    >
                      {primaryCard.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </article>
              );
            })()}

          {/* Member, Donate, Collaborate */}
          {secondaryCards.map((card) => {
            const Icon = getIcon(card.iconName);
            const cardAccent = card.accent.trim();
            const useHexAccent = isHexColor(cardAccent);
            const iconBg = card.iconBg.trim();
            const useHexIconBg = isHexColor(iconBg);
            return (
              <article
                key={card.title}
                className={`lg:col-span-2 group rounded-3xl border p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 ${useHexAccent ? "" : card.accent}`}
                style={
                  useHexAccent
                    ? {
                        backgroundColor: hexToRgba(cardAccent, 0.12),
                        borderColor: hexToRgba(cardAccent, 0.35),
                      }
                    : undefined
                }
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 ${useHexIconBg ? "" : card.iconBg}`}
                  style={
                    useHexIconBg
                      ? {
                          backgroundColor: iconBg,
                        }
                      : undefined
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
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
            <InviteCard
              title={content.invite.title}
              description={content.invite.description}
              cta={content.invite.cta}
              href={content.invite.href}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
