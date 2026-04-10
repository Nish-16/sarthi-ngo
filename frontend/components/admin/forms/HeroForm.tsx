"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveHero } from "@/app/actions/content";
import type { HeroContent, HeroStat } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, className = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white ${className}`}
    />
  );
}

function Textarea({ value, onChange, rows = 3 }: {
  value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white resize-none"
    />
  );
}

export default function HeroForm({ initial }: { initial: HeroContent }) {
  const [data, setData] = useState<HeroContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof HeroContent>(key: K, value: HeroContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleSave() {
    const res = await saveHero(data);
    setResult(res);
  }

  return (
    <SectionShell
      title="Hero Section"
      description="The first thing visitors see — logo, headline, subtext, CTAs, and stats."
      onSave={handleSave}
      saveResult={result}
    >
      <FormGroup title="Text Content">
        <Field label="Badge Text">
          <Input
            value={data.badge}
            onChange={(v) => set("badge", v)}
            placeholder="Youth-Led · Social Change · India"
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Headline (part 1)">
            <Input value={data.headline} onChange={(v) => set("headline", v)} placeholder="Answer to" />
          </Field>
          <Field label="Accent Word">
            <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} placeholder="responsible" />
          </Field>
          <Field label="Headline (end)">
            <Input value={data.headlineEnd} onChange={(v) => set("headlineEnd", v)} placeholder="youth driving social change" />
          </Field>
        </div>
        <Field label="Supporting Text">
          <Textarea value={data.subtext} onChange={(v) => set("subtext", v)} rows={3} />
        </Field>
      </FormGroup>

      <FormGroup title="Call to Action">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Label">
            <Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} placeholder="Get Involved" />
          </Field>
          <Field label="Secondary CTA Label">
            <Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} placeholder="Our Story" />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Stats Bar" description="Displayed below the CTAs — 2 to 4 stats recommended">
        <ArrayField<HeroStat>
          label=""
          items={data.stats ?? []}
          onChange={(v) => set("stats", v)}
          maxItems={4}
          createItem={() => ({ value: "", label: "" })}
          renderItem={(stat, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={stat.value}
                onChange={(v) => onChange({ ...stat, value: v })}
                placeholder="500+"
              />
              <Input
                value={stat.label}
                onChange={(v) => onChange({ ...stat, label: v })}
                placeholder="Active Members"
              />
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
