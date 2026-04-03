"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import { saveWwdHero } from "@/app/actions/content";
import type { WwdHeroContent } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
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

export default function WwdHeroForm({ initial }: { initial: WwdHeroContent }) {
  const [data, setData] = useState<WwdHeroContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WwdHeroContent>(key: K, value: WwdHeroContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Hero"
      description="Top banner — badge, headline, description, and CTAs."
      onSave={async () => setResult(await saveWwdHero(data))}
      saveResult={result}
    >
      <FormGroup title="Text Content">
        <Field label="Badge Text">
          <Input value={data.badge} onChange={(v) => set("badge", v)} placeholder="Programs and Initiatives" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline">
            <Input value={data.headline} onChange={(v) => set("headline", v)} placeholder="What" />
          </Field>
          <Field label="Headline Accent">
            <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} placeholder="We Do" />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            value={data.description}
            rows={3}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Call to Action">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Label">
            <Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
          </Field>
          <Field label="Primary CTA Href">
            <Input value={data.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref", v)} placeholder="#projects" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Secondary CTA Label">
            <Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
          </Field>
          <Field label="Secondary CTA Href">
            <Input value={data.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref", v)} placeholder="/get-involved" />
          </Field>
        </div>
      </FormGroup>
    </SectionShell>
  );
}
