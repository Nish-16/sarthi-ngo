"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveWwdPreviousProjects } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { WwdPreviousProjectsContent, WwdPreviousProjectItem } from "@/types/content";

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

const ACCENTS = [
  { label: "Pink → Rose", value: "from-pink-500 to-rose-400" },
  { label: "Emerald → Teal", value: "from-emerald-500 to-teal-400" },
  { label: "Red → Orange", value: "from-red-500 to-orange-400" },
  { label: "Indigo → Purple", value: "from-indigo-500 to-purple-400" },
  { label: "Cyan → Blue", value: "from-cyan-500 to-blue-400" },
  { label: "Orange → Amber", value: "from-orange-500 to-amber-400" },
];

export default function PreviousProjectsForm({ initial }: { initial: WwdPreviousProjectsContent }) {
  const [data, setData] = useState<WwdPreviousProjectsContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WwdPreviousProjectsContent>(key: K, value: WwdPreviousProjectsContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Previous Projects"
      description="Grid of past initiative cards."
      onSave={async () => setResult(await saveWwdPreviousProjects(data))}
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
        <Field label="Description">
          <textarea
            value={data.description}
            rows={2}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Projects">
        <ArrayField<WwdPreviousProjectItem>
          items={data.projects}
          onChange={(v) => set("projects", v)}
          createItem={() => ({ title: "", description: "", image: "", iconName: "BookOpen", accent: ACCENTS[0].value, tag: "" })}
          renderItem={(proj, _i, onChange) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Title">
                  <Input value={proj.title} onChange={(v) => onChange({ ...proj, title: v })} />
                </Field>
                <Field label="Tag">
                  <Input value={proj.tag} onChange={(v) => onChange({ ...proj, tag: v })} placeholder="Education" />
                </Field>
              </div>
              <Field label="Description">
                <textarea
                  value={proj.description}
                  rows={2}
                  onChange={(e) => onChange({ ...proj, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
                />
              </Field>
              <ImageUploader label="Image" value={proj.image} onChange={(url) => onChange({ ...proj, image: url })} aspectRatio="4/3" />
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">Icon</label>
                  <select
                    value={proj.iconName}
                    onChange={(e) => onChange({ ...proj, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">Icon Gradient</label>
                  <select
                    value={proj.accent}
                    onChange={(e) => onChange({ ...proj, accent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {ACCENTS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
