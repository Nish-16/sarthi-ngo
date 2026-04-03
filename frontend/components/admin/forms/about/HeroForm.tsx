"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutHero } from "@/app/actions/content";
import type { AboutHeroContent, AboutHeroImage, AboutHeroStat } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="text-sm font-semibold text-slate-700">{label}</label>{children}</div>;
}

function Input({ value, onChange, placeholder = "" }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />;
}

export default function AboutHeroForm({ initial }: { initial: AboutHeroContent }) {
  const [data, setData] = useState<AboutHeroContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof AboutHeroContent>(key: K, value: AboutHeroContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell title="About Hero" description="Top hero section for About page." onSave={async () => setResult(await saveAboutHero(data))} saveResult={result}>
      <FormGroup title="Text & CTAs">
        <Field label="Badge"><Input value={data.badge} onChange={(v) => set("badge", v)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline"><Input value={data.headline} onChange={(v) => set("headline", v)} /></Field>
          <Field label="Headline Accent"><Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} /></Field>
        </div>
        <Field label="Description"><textarea value={data.description} rows={3} onChange={(e) => set("description", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Label"><Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} /></Field>
          <Field label="Primary CTA Link"><Input value={data.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref", v)} /></Field>
          <Field label="Secondary CTA Label"><Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} /></Field>
          <Field label="Secondary CTA Link"><Input value={data.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref", v)} /></Field>
        </div>
      </FormGroup>

      <FormGroup title="Floating Cards">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Top Card Label"><Input value={data.topCardLabel} onChange={(v) => set("topCardLabel", v)} /></Field>
          <Field label="Top Card Value"><Input value={data.topCardValue} onChange={(v) => set("topCardValue", v)} /></Field>
          <Field label="Bottom Card Label"><Input value={data.bottomCardLabel} onChange={(v) => set("bottomCardLabel", v)} /></Field>
          <Field label="Bottom Card Value"><Input value={data.bottomCardValue} onChange={(v) => set("bottomCardValue", v)} /></Field>
        </div>
      </FormGroup>

      <FormGroup title="Trust Stats">
        <ArrayField<AboutHeroStat>
          items={data.stats}
          onChange={(v) => set("stats", v)}
          createItem={() => ({ value: "", label: "" })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Value"><Input value={item.value} onChange={(v) => onChange({ ...item, value: v })} /></Field>
              <Field label="Label"><Input value={item.label} onChange={(v) => onChange({ ...item, label: v })} /></Field>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Hero Images">
        <ArrayField<AboutHeroImage>
          items={data.images}
          onChange={(v) => set("images", v)}
          createItem={() => ({ src: "", alt: "", clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-1 gap-3">
              <Field label="Image URL"><Input value={item.src} onChange={(v) => onChange({ ...item, src: v })} /></Field>
              <Field label="Alt Text"><Input value={item.alt} onChange={(v) => onChange({ ...item, alt: v })} /></Field>
              <Field label="Clip Path"><Input value={item.clipPath} onChange={(v) => onChange({ ...item, clipPath: v })} /></Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
