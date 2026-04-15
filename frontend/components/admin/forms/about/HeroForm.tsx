"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutHero } from "@/app/actions/content";
import type {
  AboutHeroContent,
  AboutHeroImage,
  AboutHeroStat,
} from "@/types/content";

const PAGE_DESTINATIONS = [
  { label: "Home", value: "/" },
  { label: "About", value: "/about" },
  { label: "What We Do", value: "/what-we-do" },
  { label: "Get Involved", value: "/get-involved" },
  { label: "Team", value: "/team" },
] as const;

const IMAGE_CLIP_PRESETS = [
  "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
  "polygon(20% 0, 100% 0, 100% 100%, 5% 100%)",
] as const;

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

function SelectInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const hasPreset = PAGE_DESTINATIONS.some((item) => item.value === value);
  const selectedValue = hasPreset ? value : "__custom__";

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedValue}
        onChange={(e) => {
          const nextValue = e.target.value;
          onChange(nextValue === "__custom__" ? "" : nextValue);
        }}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      >
        {PAGE_DESTINATIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
        <option value="__custom__">Custom link</option>
      </select>
      {selectedValue === "__custom__" ? (
        <Input
          value={value}
          onChange={onChange}
          placeholder="/custom-page or #section"
        />
      ) : null}
    </div>
  );
}

export default function AboutHeroForm({
  initial,
}: {
  initial: AboutHeroContent;
}) {
  const [data, setData] = useState<AboutHeroContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof AboutHeroContent>(
    key: K,
    value: AboutHeroContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="About Hero"
      description="Top hero section for About page."
      onSave={async () => setResult(await saveAboutHero(data))}
      saveResult={result}
    >
      <FormGroup title="Text & CTAs">
        <Field label="Badge">
          <Input value={data.badge} onChange={(v) => set("badge", v)} />
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
          <textarea
            value={data.description}
            rows={3}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Label">
            <Input
              value={data.ctaPrimary}
              onChange={(v) => set("ctaPrimary", v)}
            />
          </Field>
          <Field label="Primary CTA Destination">
            <SelectInput
              value={data.ctaPrimaryHref}
              onChange={(v) => set("ctaPrimaryHref", v)}
            />
          </Field>
          <Field label="Secondary CTA Label">
            <Input
              value={data.ctaSecondary}
              onChange={(v) => set("ctaSecondary", v)}
            />
          </Field>
          <Field label="Secondary CTA Destination">
            <SelectInput
              value={data.ctaSecondaryHref}
              onChange={(v) => set("ctaSecondaryHref", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Trust Stats">
        <ArrayField<AboutHeroStat>
          items={data.stats}
          onChange={(v) => set("stats", v)}
          createItem={() => ({ value: "", label: "" })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Value">
                <Input
                  value={item.value}
                  onChange={(v) => onChange({ ...item, value: v })}
                />
              </Field>
              <Field label="Label">
                <Input
                  value={item.label}
                  onChange={(v) => onChange({ ...item, label: v })}
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Hero Images">
        <ArrayField<AboutHeroImage>
          items={data.images}
          onChange={(v) => set("images", v)}
          createItem={() => ({
            src: "",
            alt: "",
            clipPath: IMAGE_CLIP_PRESETS[0],
          })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-1 gap-3">
              <Field label="Image URL">
                <Input
                  value={item.src}
                  onChange={(v) => onChange({ ...item, src: v })}
                />
              </Field>
              <Field label="Alt Text">
                <Input
                  value={item.alt}
                  onChange={(v) => onChange({ ...item, alt: v })}
                />
              </Field>
              <p className="text-xs text-slate-500">
                Shape style is automatic for consistency.
              </p>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
