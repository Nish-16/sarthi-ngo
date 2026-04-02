"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import ImageUploader from "../ImageUploader";
import { saveHero } from "@/app/actions/content";
import type { HeroContent, HeroImage } from "@/types/content";

const CLIP_PATHS = [
  "polygon(0 0, 100% 0, 82% 100%, 0 100%)",
  "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
  "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
];

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
      description="The first thing visitors see — headline, images, and CTAs."
      onSave={handleSave}
      saveResult={result}
    >
      {/* Badge */}
      <Field label="Badge Text">
        <Input value={data.badge} onChange={(v) => set("badge", v)} placeholder="Youth-Led · Social Change · India" />
      </Field>

      {/* Headline parts */}
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

      {/* Subtext */}
      <Field label="Supporting Text">
        <Textarea value={data.subtext} onChange={(v) => set("subtext", v)} rows={3} />
      </Field>

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary CTA Label">
          <Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
        </Field>
        <Field label="Secondary CTA Label">
          <Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
        </Field>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Field label="Member Count Text">
          <Input value={data.memberCount} onChange={(v) => set("memberCount", v)} />
        </Field>
        <Field label="Member Cities Text">
          <Input value={data.memberCities} onChange={(v) => set("memberCities", v)} />
        </Field>
        <Field label="Impact Score">
          <Input value={data.impactScore} onChange={(v) => set("impactScore", v)} placeholder="98%" />
        </Field>
      </div>

      <Field label="Award Label (floating card)">
        <Input value={data.awardLabel} onChange={(v) => set("awardLabel", v)} />
      </Field>

      {/* Hero images */}
      <hr className="border-slate-100" />
      <ArrayField<HeroImage>
        label="Hero Images (3–5 recommended)"
        items={data.images}
        onChange={(imgs) => set("images", imgs)}
        maxItems={5}
        createItem={() => ({ src: "", alt: "", clipPath: CLIP_PATHS[1] })}
        renderItem={(img, _i, onChange) => (
          <div className="flex flex-col gap-3">
            <ImageUploader
              label="Image"
              value={img.src}
              onChange={(url) => onChange({ ...img, src: url })}
              aspectRatio="9/16"
            />
            <Input
              value={img.alt}
              onChange={(v) => onChange({ ...img, alt: v })}
              placeholder="Alt text"
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500">Clip Path</label>
              <select
                value={img.clipPath}
                onChange={(e) => onChange({ ...img, clipPath: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="polygon(0 0, 100% 0, 82% 100%, 0 100%)">Left edge (first slice)</option>
                <option value="polygon(18% 0, 100% 0, 82% 100%, 0 100%)">Middle slice</option>
                <option value="polygon(18% 0, 100% 0, 100% 100%, 0 100%)">Right edge (last slice)</option>
              </select>
            </div>
          </div>
        )}
      />

      {/* Member avatars */}
      <hr className="border-slate-100" />
      <ArrayField<string>
        label="Member Avatar URLs (shown in trust strip)"
        items={data.memberAvatars}
        onChange={(v) => set("memberAvatars", v)}
        maxItems={6}
        createItem={() => ""}
        renderItem={(url, _i, onChange) => (
          <ImageUploader
            label="Avatar URL"
            value={url}
            onChange={onChange}
            aspectRatio="1/1"
          />
        )}
      />
    </SectionShell>
  );
}
