"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedVolunteer } from "@/app/actions/content";
import type { GetInvolvedVolunteerContent } from "@/types/content";

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
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
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
        <Input value={value} onChange={onChange} />
      ) : null}
    </div>
  );
}

export default function VolunteerForm({
  initial,
}: {
  initial: GetInvolvedVolunteerContent;
}) {
  const [data, setData] = useState<GetInvolvedVolunteerContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedVolunteerContent>(
    key: K,
    value: GetInvolvedVolunteerContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Volunteer Section"
      description="Volunteer pitch with image and benefit list."
      onSave={async () => setResult(await saveGetInvolvedVolunteer(data))}
      saveResult={result}
    >
      <FormGroup title="Header & CTA">
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
          <textarea
            value={data.description}
            rows={3}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="CTA Label">
            <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          </Field>
          <Field label="CTA Destination">
            <SelectInput
              value={data.ctaHref}
              onChange={(v) => set("ctaHref", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Image & Floating Cards">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Image URL">
            <Input value={data.image} onChange={(v) => set("image", v)} />
          </Field>
          <Field label="Image Alt">
            <Input value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
          </Field>
          <Field label="Open Spots Label">
            <Input
              value={data.openSpotsLabel}
              onChange={(v) => set("openSpotsLabel", v)}
            />
          </Field>
          <Field label="Open Spots Value">
            <Input
              value={data.openSpotsValue}
              onChange={(v) => set("openSpotsValue", v)}
            />
          </Field>
          <Field label="Intake Label">
            <Input
              value={data.intakeLabel}
              onChange={(v) => set("intakeLabel", v)}
            />
          </Field>
          <Field label="Intake Value">
            <Input
              value={data.intakeValue}
              onChange={(v) => set("intakeValue", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Benefits">
        <ArrayField<string>
          items={data.benefits}
          onChange={(v) => set("benefits", v)}
          createItem={() => ""}
          renderItem={(item, _i, onChange) => (
            <Input value={item} onChange={onChange} />
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
