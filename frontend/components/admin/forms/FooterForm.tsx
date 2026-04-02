"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import { saveFooter } from "@/app/actions/content";
import type { FooterContent, FooterLinkGroup, FooterLinkItem } from "@/types/content";

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

function LinkGroupEditor({
  group,
  onChange,
}: {
  group: FooterLinkGroup;
  onChange: (g: FooterLinkGroup) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500">Category Name</label>
        <Input
          value={group.category}
          onChange={(v) => onChange({ ...group, category: v })}
          placeholder="Organisation"
        />
      </div>
      <ArrayField<FooterLinkItem>
        label="Links"
        items={group.links}
        onChange={(links) => onChange({ ...group, links })}
        createItem={() => ({ label: "", href: "#" })}
        renderItem={(link, _i, onLinkChange) => (
          <div className="grid grid-cols-2 gap-2">
            <Input value={link.label} onChange={(v) => onLinkChange({ ...link, label: v })} placeholder="Label" />
            <Input value={link.href} onChange={(v) => onLinkChange({ ...link, href: v })} placeholder="#href" />
          </div>
        )}
      />
    </div>
  );
}

export default function FooterForm({ initial }: { initial: FooterContent }) {
  const [data, setData] = useState<FooterContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof FooterContent>(key: K, value: FooterContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Footer"
      description="Multi-column footer with link groups."
      onSave={async () => setResult(await saveFooter(data))}
      saveResult={result}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Logo Text">
          <Input value={data.logoText} onChange={(v) => set("logoText", v)} />
        </Field>
        <Field label="Copyright Text">
          <Input value={data.copyright} onChange={(v) => set("copyright", v)} />
        </Field>
      </div>
      <Field label="Brand Tagline">
        <textarea
          value={data.tagline}
          rows={2}
          onChange={(e) => set("tagline", e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
        />
      </Field>

      <hr className="border-slate-100" />

      <ArrayField<FooterLinkGroup>
        label="Link Groups"
        items={data.linkGroups}
        onChange={(v) => set("linkGroups", v)}
        createItem={() => ({ category: "New Group", links: [] })}
        renderItem={(group, _i, onChange) => (
          <LinkGroupEditor group={group} onChange={onChange} />
        )}
      />
    </SectionShell>
  );
}
