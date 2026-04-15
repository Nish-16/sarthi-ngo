"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedHero } from "@/app/actions/content";
import type {
  GetInvolvedHeroContent,
  GetInvolvedHeroImage,
  GetInvolvedHeroStat,
} from "@/types/content";

const GET_INVOLVED_DESTINATIONS = [
  { label: "Get Involved options section", value: "#get-involved-options" },
  { label: "Volunteer section", value: "#volunteer" },
  { label: "Intern section", value: "#intern" },
  { label: "Collaborate section", value: "#collaborate" },
  { label: "Invite Founders section", value: "#invite-founders" },
  { label: "Home", value: "/" },
  { label: "About", value: "/about" },
  { label: "What We Do", value: "/what-we-do" },
  { label: "Get Involved", value: "/get-involved" },
  { label: "Team", value: "/team" },
] as const;

const HERO_IMAGE_CLIP_PRESETS = [
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
  const hasPreset = GET_INVOLVED_DESTINATIONS.some(
    (item) => item.value === value,
  );
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
        {GET_INVOLVED_DESTINATIONS.map((item) => (
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

export default function GetInvolvedHeroForm({
  initial,
}: {
  initial: GetInvolvedHeroContent;
}) {
  const [data, setData] = useState<GetInvolvedHeroContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedHeroContent>(
    key: K,
    value: GetInvolvedHeroContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Get Involved Hero"
      description="Edit the hero content on the Get Involved page."
      onSave={async () => setResult(await saveGetInvolvedHero(data))}
      saveResult={result}
    >
      <FormGroup title="Text Content">
        <Field label="Badge Text">
          <Input
            value={data.badge}
            onChange={(v) => set("badge", v)}
            placeholder="Join the Movement"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline (start)">
            <Input
              value={data.headline}
              onChange={(v) => set("headline", v)}
              placeholder="Be a part of"
            />
          </Field>
          <Field label="Headline Accent">
            <Input
              value={data.headlineAccent}
              onChange={(v) => set("headlineAccent", v)}
              placeholder="the change"
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
      </FormGroup>

      <FormGroup title="Call to Action Buttons">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Label">
            <Input
              value={data.ctaPrimary}
              onChange={(v) => set("ctaPrimary", v)}
              placeholder="Get Involved"
            />
          </Field>
          <Field label="Primary CTA Destination">
            <SelectInput
              value={data.ctaPrimaryHref}
              onChange={(v) => set("ctaPrimaryHref", v)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Secondary CTA Label">
            <Input
              value={data.ctaSecondary}
              onChange={(v) => set("ctaSecondary", v)}
              placeholder="Volunteer Now"
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

      <FormGroup title="Floating Cards">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Top Card Label">
            <Input
              value={data.openRolesLabel}
              onChange={(v) => set("openRolesLabel", v)}
              placeholder="Open roles"
            />
          </Field>
          <Field label="Top Card Value">
            <Input
              value={data.openRolesValue}
              onChange={(v) => set("openRolesValue", v)}
              placeholder="6 ways"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bottom Card Label">
            <Input
              value={data.communitiesLabel}
              onChange={(v) => set("communitiesLabel", v)}
              placeholder="Communities"
            />
          </Field>
          <Field label="Bottom Card Value">
            <Input
              value={data.communitiesValue}
              onChange={(v) => set("communitiesValue", v)}
              placeholder="42"
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup
        title="Quick Stat Pills"
        description="Shown under the CTA buttons."
      >
        <ArrayField<GetInvolvedHeroStat>
          items={data.stats}
          onChange={(v) => set("stats", v)}
          createItem={() => ({ value: "", label: "" })}
          renderItem={(stat, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Value">
                <Input
                  value={stat.value}
                  onChange={(v) => onChange({ ...stat, value: v })}
                  placeholder="1,200+"
                />
              </Field>
              <Field label="Label">
                <Input
                  value={stat.label}
                  onChange={(v) => onChange({ ...stat, label: v })}
                  placeholder="Volunteers"
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup
        title="Hero Images"
        description="Two image slices are recommended."
      >
        <ArrayField<GetInvolvedHeroImage>
          items={data.images}
          onChange={(v) => set("images", v)}
          createItem={() => ({
            src: "",
            alt: "",
            clipPath: HERO_IMAGE_CLIP_PRESETS[0],
          })}
          renderItem={(img, _i, onChange) => (
            <div className="grid grid-cols-1 gap-3">
              <Field label="Image URL">
                <Input
                  value={img.src}
                  onChange={(v) => onChange({ ...img, src: v })}
                  placeholder="https://..."
                />
              </Field>
              <Field label="Alt Text">
                <Input
                  value={img.alt}
                  onChange={(v) => onChange({ ...img, alt: v })}
                  placeholder="Team working together"
                />
              </Field>
              <p className="text-xs text-slate-500">
                Image shape style is automatic.
              </p>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
