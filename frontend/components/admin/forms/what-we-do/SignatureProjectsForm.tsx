"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveWwdSignatureProjects } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { WwdSignatureProjectsContent, WwdInitiativeItem } from "@/types/content";

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

const CLIP_PATHS = [
  { label: "Left slant (primary card)", value: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" },
  { label: "Right slant (secondary card)", value: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" },
  { label: "Straight", value: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];

const ACCENTS = [
  { label: "Indigo → Sky", value: "from-indigo-600/80 to-sky-500/60" },
  { label: "Emerald → Teal", value: "from-emerald-600/75 to-teal-500/60" },
  { label: "Purple → Pink", value: "from-purple-600/80 to-pink-500/60" },
  { label: "Orange → Red", value: "from-orange-600/80 to-red-500/60" },
  { label: "Rose → Pink", value: "from-rose-600/80 to-pink-500/60" },
];

export default function SignatureProjectsForm({ initial }: { initial: WwdSignatureProjectsContent }) {
  const [data, setData] = useState<WwdSignatureProjectsContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof WwdSignatureProjectsContent>(key: K, value: WwdSignatureProjectsContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Signature Projects"
      description="Two featured initiative cards — first is the large dark card, second is the smaller light card."
      onSave={async () => setResult(await saveWwdSignatureProjects(data))}
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
        <Field label="Sub-heading">
          <Input value={data.subheading} onChange={(v) => set("subheading", v)} />
        </Field>
      </FormGroup>

      <FormGroup title="Initiatives" description="Position 1 = large dark card · Position 2 = smaller light card">
        <ArrayField<WwdInitiativeItem>
          items={data.initiatives}
          onChange={(v) => set("initiatives", v)}
          maxItems={2}
          createItem={() => ({
            name: "",
            tagline: "",
            description: "",
            image: "",
            clipPath: CLIP_PATHS[0].value,
            accent: ACCENTS[0].value,
            iconName: "Users",
          })}
          renderItem={(item, _i, onChange) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name">
                  <Input value={item.name} onChange={(v) => onChange({ ...item, name: v })} placeholder="Abhivyakti" />
                </Field>
                <Field label="Tagline">
                  <Input value={item.tagline} onChange={(v) => onChange({ ...item, tagline: v })} placeholder="Youth Expression Lab" />
                </Field>
              </div>
              <Field label="Description">
                <textarea
                  value={item.description}
                  rows={2}
                  onChange={(e) => onChange({ ...item, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
                />
              </Field>
              <ImageUploader label="Image" value={item.image} onChange={(url) => onChange({ ...item, image: url })} aspectRatio="16/9" />
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">Icon</label>
                  <select
                    value={item.iconName}
                    onChange={(e) => onChange({ ...item, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">Accent Gradient</label>
                  <select
                    value={item.accent}
                    onChange={(e) => onChange({ ...item, accent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {ACCENTS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">Clip Path</label>
                  <select
                    value={item.clipPath}
                    onChange={(e) => onChange({ ...item, clipPath: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {CLIP_PATHS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
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
