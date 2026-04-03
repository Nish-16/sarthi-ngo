"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveTeamHero } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { TeamHeroContent, TeamStatItem } from "@/types/content";

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

export default function TeamHeroForm({ initial }: { initial: TeamHeroContent }) {
  const [data, setData] = useState<TeamHeroContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof TeamHeroContent>(key: K, value: TeamHeroContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Hero"
      description="Top banner for the Team page."
      onSave={async () => setResult(await saveTeamHero(data))}
      saveResult={result}
    >
      <FormGroup title="Text Content">
        <Field label="Badge Text">
          <Input value={data.badge} onChange={(v) => set("badge", v)} placeholder="The People Behind Sarthi" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline">
            <Input value={data.headline} onChange={(v) => set("headline", v)} placeholder="Our" />
          </Field>
          <Field label="Headline Accent">
            <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} placeholder="Team" />
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

      <FormGroup title="Stat Pills">
        <ArrayField<TeamStatItem>
          items={data.stats}
          onChange={(v) => set("stats", v)}
          createItem={() => ({ value: "", label: "", iconName: "Users" })}
          renderItem={(stat, _i, onChange) => (
            <div className="grid grid-cols-3 gap-2">
              <Field label="Value">
                <Input value={stat.value} onChange={(v) => onChange({ ...stat, value: v })} placeholder="1,200+" />
              </Field>
              <Field label="Label">
                <Input value={stat.label} onChange={(v) => onChange({ ...stat, label: v })} placeholder="Active volunteers" />
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
