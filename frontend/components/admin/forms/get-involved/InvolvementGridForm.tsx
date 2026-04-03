"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedInvolvementGrid } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type {
  GetInvolvedGridCard,
  GetInvolvedGridContent,
  GetInvolvedGridFeatured,
  GetInvolvedGridInvite,
} from "@/types/content";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    />
  );
}

export default function InvolvementGridForm({
  initial,
}: {
  initial: GetInvolvedGridContent;
}) {
  const [data, setData] = useState<GetInvolvedGridContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedGridContent>(
    key: K,
    value: GetInvolvedGridContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Ways to Join"
      description="Bento section with featured card, supporting cards, and invite banner."
      onSave={async () => setResult(await saveGetInvolvedInvolvementGrid(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline">
            <Input value={data.headline} onChange={(v) => set("headline", v)} />
          </Field>
          <Field label="Headline Accent">
            <Input
              value={data.headlineAccent}
              onChange={(v) => set("headlineAccent", v)}
            />
          </Field>
        </div>
        <Field label="Description">
          <Input
            value={data.description}
            onChange={(v) => set("description", v)}
          />
        </Field>
      </FormGroup>

      <FormGroup title="Featured Card">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title">
            <Input
              value={data.featured.title}
              onChange={(v) => set("featured", { ...data.featured, title: v })}
            />
          </Field>
          <Field label="Badge">
            <Input
              value={data.featured.badge}
              onChange={(v) => set("featured", { ...data.featured, badge: v })}
            />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            value={data.featured.description}
            rows={3}
            onChange={(e) =>
              set("featured", { ...data.featured, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="CTA Label">
            <Input
              value={data.featured.cta}
              onChange={(v) => set("featured", { ...data.featured, cta: v })}
            />
          </Field>
          <Field label="CTA Link">
            <Input
              value={data.featured.href}
              onChange={(v) => set("featured", { ...data.featured, href: v })}
            />
          </Field>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Icon</label>
            <select
              value={data.featured.iconName}
              onChange={(e) =>
                set("featured", { ...data.featured, iconName: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {iconNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Field label="Image URL">
          <Input
            value={data.featured.image}
            onChange={(v) => set("featured", { ...data.featured, image: v })}
          />
        </Field>
      </FormGroup>

      <FormGroup title="Supporting Cards">
        <ArrayField<GetInvolvedGridCard>
          items={data.cards}
          onChange={(v) => set("cards", v)}
          createItem={() => ({
            iconName: "Users",
            title: "",
            description: "",
            cta: "",
            href: "",
            accent: "bg-indigo-50 border-indigo-100",
            iconBg: "bg-gradient-to-br from-indigo-500 to-purple-500",
            ctaVariant: "outline",
          })}
          renderItem={(card, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <Input
                  value={card.title}
                  onChange={(v) => onChange({ ...card, title: v })}
                />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Icon
                </label>
                <select
                  value={card.iconName}
                  onChange={(e) =>
                    onChange({ ...card, iconName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {iconNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Description">
                <Input
                  value={card.description}
                  onChange={(v) => onChange({ ...card, description: v })}
                />
              </Field>
              <Field label="Accent Classes">
                <Input
                  value={card.accent}
                  onChange={(v) => onChange({ ...card, accent: v })}
                />
              </Field>
              <Field label="Icon Background Classes">
                <Input
                  value={card.iconBg}
                  onChange={(v) => onChange({ ...card, iconBg: v })}
                />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  CTA Variant
                </label>
                <select
                  value={card.ctaVariant}
                  onChange={(e) =>
                    onChange({
                      ...card,
                      ctaVariant: e.target
                        .value as GetInvolvedGridCard["ctaVariant"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="outline">outline</option>
                  <option value="ghost">ghost</option>
                </select>
              </div>
              <Field label="CTA Label">
                <Input
                  value={card.cta}
                  onChange={(v) => onChange({ ...card, cta: v })}
                />
              </Field>
              <Field label="CTA Link">
                <Input
                  value={card.href}
                  onChange={(v) => onChange({ ...card, href: v })}
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Invite Banner">
        {(() => {
          const invite: GetInvolvedGridInvite = data.invite;
          return (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <Input
                  value={invite.title}
                  onChange={(v) => set("invite", { ...invite, title: v })}
                />
              </Field>
              <Field label="CTA Label">
                <Input
                  value={invite.cta}
                  onChange={(v) => set("invite", { ...invite, cta: v })}
                />
              </Field>
              <Field label="Description">
                <Input
                  value={invite.description}
                  onChange={(v) => set("invite", { ...invite, description: v })}
                />
              </Field>
              <Field label="CTA Link">
                <Input
                  value={invite.href}
                  onChange={(v) => set("invite", { ...invite, href: v })}
                />
              </Field>
            </div>
          );
        })()}
      </FormGroup>
    </SectionShell>
  );
}
