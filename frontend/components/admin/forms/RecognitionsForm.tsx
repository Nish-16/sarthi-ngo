"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveRecognitions } from "@/app/actions/content";
import type { RecognitionsContent, OrgItem, AwardItem } from "@/types/content";

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

export default function RecognitionsForm({
  initial,
}: {
  initial: RecognitionsContent;
}) {
  const [data, setData] = useState<RecognitionsContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof RecognitionsContent>(
    key: K,
    value: RecognitionsContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Recognitions & Awards"
      description="Partner logos and award cards."
      onSave={async () => setResult(await saveRecognitions(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Eyebrow">
            <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
          </Field>
          <Field label="Headline Accent">
            <Input
              value={data.headlineAccent}
              onChange={(v) => set("headlineAccent", v)}
            />
          </Field>
        </div>
        <Field label="Headline (before accent)">
          <Input value={data.headline} onChange={(v) => set("headline", v)} />
        </Field>
        <Field label="Description">
          <textarea
            value={data.description}
            rows={2}
            onChange={(e) => set("description", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Partner Organizations">
        <ArrayField<OrgItem>
          label=""
          items={data.organizations}
          onChange={(v) => set("organizations", v)}
          createItem={() => ({ name: "", abbr: "" })}
          renderItem={(org, _i, onChange) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="md:col-span-2">
                <Input
                  value={org.name}
                  onChange={(v) => onChange({ ...org, name: v })}
                  placeholder="Organization name"
                />
              </div>
              <Input
                value={org.abbr}
                onChange={(v) => onChange({ ...org, abbr: v })}
                placeholder="Abbr"
              />
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Awards">
        <ArrayField<AwardItem>
          label=""
          items={data.awards}
          onChange={(v) => set("awards", v)}
          createItem={() => ({ icon: "🏆", title: "", year: "" })}
          renderItem={(award, _i, onChange) => (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <div className="md:col-span-1">
                <Input
                  value={award.icon}
                  onChange={(v) => onChange({ ...award, icon: v })}
                  placeholder="🏆"
                />
              </div>
              <div className="md:col-span-8">
                <Input
                  value={award.title}
                  onChange={(v) => onChange({ ...award, title: v })}
                  placeholder="Award title"
                />
              </div>
              <div className="md:col-span-3">
                <Input
                  value={award.year}
                  onChange={(v) => onChange({ ...award, year: v })}
                  placeholder="2024"
                />
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
