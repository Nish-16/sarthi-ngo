"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutVisionMissionValues } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { AboutPillarItem, AboutVisionMissionValuesContent } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="text-sm font-semibold text-slate-700">{label}</label>{children}</div>;
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />;
}

export default function VisionMissionValuesForm({ initial }: { initial: AboutVisionMissionValuesContent }) {
  const [data, setData] = useState<AboutVisionMissionValuesContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof AboutVisionMissionValuesContent>(key: K, value: AboutVisionMissionValuesContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell title="Vision Mission Values" description="Three pillar cards section." onSave={async () => setResult(await saveAboutVisionMissionValues(data))} saveResult={result}>
      <FormGroup title="Header">
        <Field label="Eyebrow"><Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline"><Input value={data.headline} onChange={(v) => set("headline", v)} /></Field>
          <Field label="Headline Accent"><Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} /></Field>
        </div>
        <Field label="Description"><Input value={data.description} onChange={(v) => set("description", v)} /></Field>
      </FormGroup>

      <FormGroup title="Pillar Cards">
        <ArrayField<AboutPillarItem>
          items={data.pillars}
          onChange={(v) => set("pillars", v)}
          createItem={() => ({ title: "", iconName: "Star", description: "", accent: "", bg: "", iconBg: "", tag: "" })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={item.title} onChange={(v) => onChange({ ...item, title: v })} /></Field>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-semibold text-slate-700">Icon</label><select value={item.iconName} onChange={(e) => onChange({ ...item, iconName: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">{iconNames.map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
              <Field label="Tag"><Input value={item.tag} onChange={(v) => onChange({ ...item, tag: v })} /></Field>
              <Field label="Description"><Input value={item.description} onChange={(v) => onChange({ ...item, description: v })} /></Field>
              <Field label="Background Classes"><Input value={item.bg} onChange={(v) => onChange({ ...item, bg: v })} /></Field>
              <Field label="Icon Background Classes"><Input value={item.iconBg} onChange={(v) => onChange({ ...item, iconBg: v })} /></Field>
              <Field label="Accent Classes"><Input value={item.accent} onChange={(v) => onChange({ ...item, accent: v })} /></Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
