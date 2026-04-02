"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import { saveNavbar } from "@/app/actions/content";
import type { NavbarContent, NavLink } from "@/types/content";

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

export default function NavbarForm({ initial }: { initial: NavbarContent }) {
  const [data, setData] = useState<NavbarContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof NavbarContent>(key: K, value: NavbarContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Navbar"
      description="Top navigation bar — logo, links, and CTA button."
      onSave={async () => setResult(await saveNavbar(data))}
      saveResult={result}
    >
      <Field label="Logo Text">
        <Input value={data.logoText} onChange={(v) => set("logoText", v)} placeholder="Sarthi" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="CTA Button Label">
          <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
        </Field>
        <Field label="CTA Button Href">
          <Input value={data.ctaHref} onChange={(v) => set("ctaHref", v)} placeholder="#join" />
        </Field>
      </div>

      <hr className="border-slate-100" />

      <ArrayField<NavLink>
        label="Navigation Links"
        items={data.links}
        onChange={(v) => set("links", v)}
        createItem={() => ({ label: "", href: "#" })}
        renderItem={(link, _i, onChange) => (
          <div className="grid grid-cols-2 gap-2">
            <Input value={link.label} onChange={(v) => onChange({ ...link, label: v })} placeholder="Link label" />
            <Input value={link.href} onChange={(v) => onChange({ ...link, href: v })} placeholder="#section" />
          </div>
        )}
      />
    </SectionShell>
  );
}
