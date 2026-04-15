"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedIntern } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import { toPickerHex } from "@/lib/color";
import type {
  GetInvolvedInternContent,
  GetInvolvedOpportunityItem,
} from "@/types/content";

const DEFAULT_OPPORTUNITY_COLOR = "#6366f1";
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

export default function InternForm({
  initial,
}: {
  initial: GetInvolvedInternContent;
}) {
  const [data, setData] = useState<GetInvolvedInternContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedInternContent>(
    key: K,
    value: GetInvolvedInternContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Intern Section"
      description="Internship section with opportunities."
      onSave={async () => setResult(await saveGetInvolvedIntern(data))}
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
          <Field label="Duration Label">
            <Input
              value={data.durationLabel}
              onChange={(v) => set("durationLabel", v)}
            />
          </Field>
          <Field label="Duration Value">
            <Input
              value={data.durationValue}
              onChange={(v) => set("durationValue", v)}
            />
          </Field>
          <Field label="Trained Label">
            <Input
              value={data.trainedLabel}
              onChange={(v) => set("trainedLabel", v)}
            />
          </Field>
          <Field label="Trained Value">
            <Input
              value={data.trainedValue}
              onChange={(v) => set("trainedValue", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Opportunity Cards">
        <ArrayField<GetInvolvedOpportunityItem>
          items={data.opportunities}
          onChange={(v) => set("opportunities", v)}
          createItem={() => ({
            iconName: "Users",
            title: "",
            description: "",
            color: DEFAULT_OPPORTUNITY_COLOR,
          })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <Input
                  value={item.title}
                  onChange={(v) => onChange({ ...item, title: v })}
                />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Icon
                </label>
                <select
                  value={item.iconName}
                  onChange={(e) =>
                    onChange({ ...item, iconName: e.target.value })
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
                  value={item.description}
                  onChange={(v) => onChange({ ...item, description: v })}
                />
              </Field>
              <Field label="Color">
                <input
                  type="color"
                  value={toPickerHex(item.color, DEFAULT_OPPORTUNITY_COLOR)}
                  onChange={(e) => onChange({ ...item, color: e.target.value })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
