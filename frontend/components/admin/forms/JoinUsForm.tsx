"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import { saveJoinUs } from "@/app/actions/content";
import type { JoinUsContent } from "@/types/content";

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

export default function JoinUsForm({ initial }: { initial: JoinUsContent }) {
  const [data, setData] = useState<JoinUsContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof JoinUsContent>(key: K, value: JoinUsContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Join Us CTA"
      description="Full-width gradient call-to-action section."
      onSave={async () => setResult(await saveJoinUs(data))}
      saveResult={result}
    >
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
          rows={3}
          onChange={(e) => set("description", e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary CTA Label">
          <Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
        </Field>
        <Field label="Secondary CTA Label">
          <Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
        </Field>
      </div>
      <Field label="Secondary CTA Href">
        <Input value={data.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref", v)} placeholder="#projects" />
      </Field>

      <hr className="border-slate-100" />

      <ArrayField<string>
        label="Trust Badges"
        items={data.badges}
        onChange={(v) => set("badges", v)}
        createItem={() => "✓ "}
        renderItem={(badge, _i, onChange) => (
          <Input value={badge} onChange={onChange} placeholder="✓ Free to join" />
        )}
      />
    </SectionShell>
  );
}
