"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutSharedLeadership } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import { toPickerHex } from "@/lib/color";
import type {
  AboutSharedLeadershipContent,
  AboutSharedLeadershipPrinciple,
} from "@/types/content";

const DEFAULT_PRINCIPLE_COLOR = "#6366f1";

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

export default function SharedLeadershipForm({
  initial,
}: {
  initial: AboutSharedLeadershipContent;
}) {
  const [data, setData] = useState<AboutSharedLeadershipContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof AboutSharedLeadershipContent>(
    key: K,
    value: AboutSharedLeadershipContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Shared Leadership"
      description="CTA block with principles grid."
      onSave={async () => setResult(await saveAboutSharedLeadership(data))}
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
            <Input value={data.cta} onChange={(v) => set("cta", v)} />
          </Field>
          <Field label="CTA Link">
            <Input value={data.ctaHref} onChange={(v) => set("ctaHref", v)} />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Principles">
        <ArrayField<AboutSharedLeadershipPrinciple>
          items={data.principles}
          onChange={(v) => set("principles", v)}
          createItem={() => ({
            iconName: "Network",
            label: "",
            color: DEFAULT_PRINCIPLE_COLOR,
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
              <Field label="Color">
                <input
                  type="color"
                  value={toPickerHex(item.color, DEFAULT_PRINCIPLE_COLOR)}
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
