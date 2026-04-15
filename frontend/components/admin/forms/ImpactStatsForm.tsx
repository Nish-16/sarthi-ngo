"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveImpactStats } from "@/app/actions/content";
import { toPickerHex } from "@/lib/color";
import type { ImpactStatsContent, StatItem } from "@/types/content";

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

const DEFAULT_STAT_COLOR = "#6366f1";

export default function ImpactStatsForm({
  initial,
}: {
  initial: ImpactStatsContent;
}) {
  const [data, setData] = useState<ImpactStatsContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof ImpactStatsContent>(
    key: K,
    value: ImpactStatsContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Impact Stats"
      description="Dark section with big number callouts."
      onSave={async () => setResult(await saveImpactStats(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Eyebrow">
            <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
          </Field>
          <Field label="Footnote">
            <Input value={data.footnote} onChange={(v) => set("footnote", v)} />
          </Field>
        </div>
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
            rows={2}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Statistics" description="Up to 6 stat cards">
        <ArrayField<StatItem>
          label=""
          items={data.stats}
          onChange={(v) => set("stats", v)}
          maxItems={6}
          createItem={() => ({
            value: "",
            label: "",
            description: "",
            icon: "⭐",
            gradient: DEFAULT_STAT_COLOR,
          })}
          renderItem={(stat, _i, onChange) => (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Value
                </label>
                <Input
                  value={stat.value}
                  onChange={(v) => onChange({ ...stat, value: v })}
                  placeholder="500+"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Icon (emoji)
                </label>
                <Input
                  value={stat.icon}
                  onChange={(v) => onChange({ ...stat, icon: v })}
                  placeholder="🎓"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Label
                </label>
                <Input
                  value={stat.label}
                  onChange={(v) => onChange({ ...stat, label: v })}
                  placeholder="Active Interns"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Description
                </label>
                <Input
                  value={stat.description}
                  onChange={(v) => onChange({ ...stat, description: v })}
                  placeholder="Youth trained annually"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Color
                </label>
                <input
                  type="color"
                  value={toPickerHex(stat.gradient, DEFAULT_STAT_COLOR)}
                  onChange={(e) =>
                    onChange({ ...stat, gradient: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
