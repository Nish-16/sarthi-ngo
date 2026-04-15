"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedCollaborate } from "@/app/actions/content";
import type { GetInvolvedCollaborateContent } from "@/types/content";

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

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
    />
  );
}

export default function CollaborateForm({
  initial,
}: {
  initial: GetInvolvedCollaborateContent;
}) {
  const [data, setData] = useState<GetInvolvedCollaborateContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedCollaborateContent>(
    key: K,
    value: GetInvolvedCollaborateContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Collaborate Section"
      description="Narrative collaboration section — who can join and how."
      onSave={async () => setResult(await saveGetInvolvedCollaborate(data))}
      saveResult={result}
    >
      <FormGroup title="Header">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <Field label="Headline (before gradient accent)">
          <Input value={data.headline} onChange={(v) => set("headline", v)} />
        </Field>
        <Field label="Tagline">
          <TextArea value={data.tagline} onChange={(v) => set("tagline", v)} />
        </Field>
      </FormGroup>

      <FormGroup title="Body Paragraphs">
        <ArrayField<string>
          items={data.paragraphs}
          onChange={(v) => set("paragraphs", v)}
          createItem={() => ""}
          renderItem={(item, _i, onChange) => (
            <TextArea value={item} onChange={onChange} rows={2} />
          )}
        />
      </FormGroup>

      <FormGroup title="Closing Text">
        <Field label="Closing / Italicised call to action">
          <TextArea
            value={data.closingText}
            onChange={(v) => set("closingText", v)}
          />
        </Field>
      </FormGroup>

      <FormGroup title="Who Can Collaborate">
        <ArrayField<string>
          items={data.collaboratorTypes}
          onChange={(v) => set("collaboratorTypes", v)}
          createItem={() => ""}
          renderItem={(item, _i, onChange) => (
            <Input value={item} onChange={onChange} />
          )}
        />
      </FormGroup>

      <FormGroup title="Contribution Modes">
        <ArrayField<string>
          items={data.contributionModes}
          onChange={(v) => set("contributionModes", v)}
          createItem={() => ""}
          renderItem={(item, _i, onChange) => (
            <Input value={item} onChange={onChange} />
          )}
        />
      </FormGroup>

      <FormGroup title="CTA">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Button Label">
            <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          </Field>
          <Field label="Button Destination">
            <SelectInput
              value={data.ctaHref}
              onChange={(v) => set("ctaHref", v)}
            />
          </Field>
        </div>
      </FormGroup>
    </SectionShell>
  );
}
