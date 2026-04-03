"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedCollaborate } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type {
  GetInvolvedCollaborateContent,
  GetInvolvedCollaborateOption,
} from "@/types/content";

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
      description="Partnership and collaboration cards."
      onSave={async () => setResult(await saveGetInvolvedCollaborate(data))}
      saveResult={result}
    >
      <FormGroup title="Header">
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
      </FormGroup>

      <FormGroup title="Option Cards">
        <ArrayField<GetInvolvedCollaborateOption>
          items={data.options}
          onChange={(v) => set("options", v)}
          createItem={() => ({
            iconName: "Handshake",
            title: "",
            description: "",
            cta: "",
            href: "",
            color: "bg-white/15 border-white/20 hover:bg-white/20",
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
              <Field label="Color Classes">
                <Input
                  value={item.color}
                  onChange={(v) => onChange({ ...item, color: v })}
                />
              </Field>
              <Field label="CTA Label">
                <Input
                  value={item.cta}
                  onChange={(v) => onChange({ ...item, cta: v })}
                />
              </Field>
              <Field label="CTA Link">
                <Input
                  value={item.href}
                  onChange={(v) => onChange({ ...item, href: v })}
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
