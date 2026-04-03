"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveAboutRecognition } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { AboutRecognitionBlock, AboutRecognitionContent } from "@/types/content";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label className="text-sm font-semibold text-slate-700">{label}</label>{children}</div>;
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />;
}

export default function RecognitionForm({ initial }: { initial: AboutRecognitionContent }) {
  const [data, setData] = useState<AboutRecognitionContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof AboutRecognitionContent>(key: K, value: AboutRecognitionContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell title="Recognition" description="Dark recognition and partner strip section." onSave={async () => setResult(await saveAboutRecognition(data))} saveResult={result}>
      <FormGroup title="Header">
        <Field label="Eyebrow"><Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline"><Input value={data.headline} onChange={(v) => set("headline", v)} /></Field>
          <Field label="Headline Accent"><Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} /></Field>
        </div>
        <Field label="Description"><Input value={data.description} onChange={(v) => set("description", v)} /></Field>
      </FormGroup>

      <FormGroup title="Recognition Blocks">
        <ArrayField<AboutRecognitionBlock>
          items={data.blocks}
          onChange={(v) => set("blocks", v)}
          createItem={() => ({ title: "", iconName: "Trophy", accent: "", iconColor: "", details: [""] })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={item.title} onChange={(v) => onChange({ ...item, title: v })} /></Field>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-semibold text-slate-700">Icon</label><select value={item.iconName} onChange={(e) => onChange({ ...item, iconName: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">{iconNames.map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
              <Field label="Accent Classes"><Input value={item.accent} onChange={(v) => onChange({ ...item, accent: v })} /></Field>
              <Field label="Icon Color Classes"><Input value={item.iconColor} onChange={(v) => onChange({ ...item, iconColor: v })} /></Field>
              <div className="col-span-2">
                <ArrayField<string>
                  items={item.details}
                  onChange={(v) => onChange({ ...item, details: v })}
                  createItem={() => ""}
                  renderItem={(detail, __i, onDetailChange) => <Input value={detail} onChange={onDetailChange} />}
                />
              </div>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Partner Strip">
        <Field label="Eyebrow"><Input value={data.partnerEyebrow} onChange={(v) => set("partnerEyebrow", v)} /></Field>
        <ArrayField<string>
          items={data.partnerLogos}
          onChange={(v) => set("partnerLogos", v)}
          createItem={() => ""}
          renderItem={(logo, _i, onChange) => <Input value={logo} onChange={onChange} />}
        />
      </FormGroup>
    </SectionShell>
  );
}
