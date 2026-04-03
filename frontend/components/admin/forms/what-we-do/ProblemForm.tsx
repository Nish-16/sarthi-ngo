"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveWwdProblem } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { WwdProblemContent, WwdGapItem } from "@/types/content";

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

const GAP_COLORS = [
  { label: "Orange", value: "text-orange-500 bg-orange-50" },
  { label: "Indigo", value: "text-indigo-500 bg-indigo-50" },
  { label: "Rose", value: "text-rose-500 bg-rose-50" },
  { label: "Emerald", value: "text-emerald-500 bg-emerald-50" },
  { label: "Purple", value: "text-purple-500 bg-purple-50" },
  { label: "Cyan", value: "text-cyan-500 bg-cyan-50" },
];

export default function ProblemForm({ initial }: { initial: WwdProblemContent }) {
  const [data, setData] = useState<WwdProblemContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WwdProblemContent>(key: K, value: WwdProblemContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="The Problem"
      description="Two-column section with text, gap pills, and an image."
      onSave={async () => setResult(await saveWwdProblem(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} placeholder="The Problem" />
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

      <FormGroup title="Body Text">
        <Field label="Paragraph 1">
          <textarea
            value={data.description1}
            rows={3}
            onChange={(e) => set("description1", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
        <Field label="Paragraph 2">
          <textarea
            value={data.description2}
            rows={3}
            onChange={(e) => set("description2", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Image & Floating Stat">
        <ImageUploader label="Section Image" value={data.image} onChange={(url) => set("image", url)} aspectRatio="4/3" />
        <Field label="Image Alt Text">
          <Input value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Stat Value">
            <Input value={data.statValue} onChange={(v) => set("statValue", v)} placeholder="42+" />
          </Field>
          <Field label="Stat Label">
            <Input value={data.statLabel} onChange={(v) => set("statLabel", v)} placeholder="Communities reached" />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Gap Pills">
        <ArrayField<WwdGapItem>
          items={data.gaps}
          onChange={(v) => set("gaps", v)}
          createItem={() => ({ iconName: "AlertTriangle", label: "", color: GAP_COLORS[0].value })}
          renderItem={(gap, _i, onChange) => (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Icon</label>
                <select
                  value={gap.iconName}
                  onChange={(e) => onChange({ ...gap, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Label</label>
                <input
                  type="text"
                  value={gap.label}
                  onChange={(e) => onChange({ ...gap, label: e.target.value })}
                  placeholder="Unequal Learning Access"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Color</label>
                <select
                  value={gap.color}
                  onChange={(e) => onChange({ ...gap, color: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {GAP_COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
