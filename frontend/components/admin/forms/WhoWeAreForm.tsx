"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import ImageUploader from "../ImageUploader";
import { saveWhoWeAre } from "@/app/actions/content";
import type { WhoWeAreContent } from "@/types/content";

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
      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
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

export default function WhoWeAreForm({ initial }: { initial: WhoWeAreContent }) {
  const [data, setData] = useState<WhoWeAreContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WhoWeAreContent>(key: K, value: WhoWeAreContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Who We Are"
      description="About section with dual images and values."
      onSave={async () => setResult(await saveWhoWeAre(data))}
      saveResult={result}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Eyebrow Label">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <Field label="CTA Label">
          <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Headline (before accent)">
          <Input value={data.headline} onChange={(v) => set("headline", v)} />
        </Field>
        <Field label="Headline Accent">
          <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Years Value">
          <Input value={data.yearsValue} onChange={(v) => set("yearsValue", v)} placeholder="6+" />
        </Field>
        <Field label="Years Label">
          <Input value={data.yearsLabel} onChange={(v) => set("yearsLabel", v)} placeholder="Years of Impact" />
        </Field>
      </div>

      <Field label="Description Paragraph 1">
        <Textarea value={data.description1} onChange={(v) => set("description1", v)} rows={4} />
      </Field>

      <Field label="Description Paragraph 2">
        <Textarea value={data.description2} onChange={(v) => set("description2", v)} rows={4} />
      </Field>

      <hr className="border-slate-100" />

      <ArrayField<string>
        label="Values (pills displayed below description)"
        items={data.values}
        onChange={(v) => set("values", v)}
        createItem={() => ""}
        renderItem={(val, _i, onChange) => (
          <Input value={val} onChange={onChange} placeholder="🌱 Sustainability" />
        )}
      />

      <hr className="border-slate-100" />

      <ImageUploader
        label="Main Image"
        value={data.mainImage}
        onChange={(url) => set("mainImage", url)}
        aspectRatio="4/3"
      />
      <Field label="Main Image Alt Text">
        <Input value={data.mainImageAlt} onChange={(v) => set("mainImageAlt", v)} />
      </Field>

      <ImageUploader
        label="Secondary Image (floating card)"
        value={data.secondaryImage}
        onChange={(url) => set("secondaryImage", url)}
        aspectRatio="1/1"
      />
      <Field label="Secondary Image Alt Text">
        <Input value={data.secondaryImageAlt} onChange={(v) => set("secondaryImageAlt", v)} />
      </Field>
    </SectionShell>
  );
}
