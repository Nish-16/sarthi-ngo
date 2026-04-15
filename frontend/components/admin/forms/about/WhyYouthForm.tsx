"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutWhyYouth } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type {
  AboutWhyYouthContent,
  AboutWhyYouthReason,
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

export default function WhyYouthForm({
  initial,
}: {
  initial: AboutWhyYouthContent;
}) {
  const [data, setData] = useState<AboutWhyYouthContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof AboutWhyYouthContent>(
    key: K,
    value: AboutWhyYouthContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Why Youth"
      description="Image + reasons section. Colors are automatic; you only edit text and icons."
      onSave={async () => setResult(await saveAboutWhyYouth(data))}
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
        <Field label="Description 1">
          <Input
            value={data.description1}
            onChange={(v) => set("description1", v)}
          />
        </Field>
        <Field label="Description 2">
          <Input
            value={data.description2}
            onChange={(v) => set("description2", v)}
          />
        </Field>
      </FormGroup>

      <FormGroup title="Image & Stat">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Image URL">
            <Input value={data.image} onChange={(v) => set("image", v)} />
          </Field>
          <Field label="Image Alt">
            <Input value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
          </Field>
          <Field label="Stat Label">
            <Input
              value={data.statLabel}
              onChange={(v) => set("statLabel", v)}
            />
          </Field>
          <Field label="Stat Value">
            <Input
              value={data.statValue}
              onChange={(v) => set("statValue", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Reason Pills">
        <ArrayField<AboutWhyYouthReason>
          items={data.reasons}
          onChange={(v) => set("reasons", v)}
          createItem={() => ({
            iconName: "Lightbulb",
            label: "",
            color: "bg-indigo-50 text-indigo-600 border-indigo-100",
          })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Label">
                <Input
                  value={item.label}
                  onChange={(v) => onChange({ ...item, label: v })}
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
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
