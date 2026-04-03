"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveWwdImpact } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { WwdImpactContent, WwdImpactStatItem } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
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

export default function ImpactForm({ initial }: { initial: WwdImpactContent }) {
  const [data, setData] = useState<WwdImpactContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WwdImpactContent>(key: K, value: WwdImpactContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Impact Numbers"
      description="Indigo gradient banner with stat cards."
      onSave={async () => setResult(await saveWwdImpact(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline">
            <Input value={data.headline} onChange={(v) => set("headline", v)} />
          </Field>
          <Field label="Headline Accent">
            <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Stats">
        <ArrayField<WwdImpactStatItem>
          items={data.stats}
          onChange={(v) => set("stats", v)}
          maxItems={6}
          createItem={() => ({ value: "", label: "", iconName: "Users" })}
          renderItem={(stat, _i, onChange) => (
            <div className="grid grid-cols-3 gap-2">
              <Field label="Value">
                <Input value={stat.value} onChange={(v) => onChange({ ...stat, value: v })} placeholder="95K+" />
              </Field>
              <Field label="Label">
                <Input value={stat.label} onChange={(v) => onChange({ ...stat, label: v })} placeholder="People Reached" />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Icon</label>
                <select
                  value={stat.iconName}
                  onChange={(e) => onChange({ ...stat, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
