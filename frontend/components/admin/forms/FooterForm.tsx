"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveFooter } from "@/app/actions/content";
import type {
  FooterContent,
  FooterLinkGroup,
  FooterLinkItem,
} from "@/types/content";

const FOOTER_DESTINATIONS = [
  { label: "Home", value: "/" },
  { label: "About", value: "/about" },
  { label: "What We Do", value: "/what-we-do" },
  { label: "Get Involved", value: "/get-involved" },
  { label: "Team", value: "/team" },
  { label: "Home: Who We Are", value: "#who-we-are" },
  { label: "Home: Impact", value: "#impact" },
  { label: "Home: Stories", value: "#stories-updates" },
  { label: "Home: Projects", value: "#featured-projects" },
  { label: "Home: Join Us", value: "#join-us" },
  { label: "Get Involved: Volunteer", value: "/get-involved#volunteer" },
  { label: "Get Involved: Intern", value: "/get-involved#intern" },
  {
    label: "Get Involved: Collaborate",
    value: "/get-involved#collaborate",
  },
] as const;

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

function SelectInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const hasPreset = FOOTER_DESTINATIONS.some((item) => item.value === value);
  const selectedValue = hasPreset ? value : "__custom__";

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedValue}
        onChange={(e) => {
          const nextValue = e.target.value;
          onChange(nextValue === "__custom__" ? "" : nextValue);
        }}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      >
        {FOOTER_DESTINATIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
        <option value="__custom__">Custom link</option>
      </select>
      {selectedValue === "__custom__" ? (
        <Input
          value={value}
          onChange={onChange}
          placeholder="/custom-page or #section"
        />
      ) : null}
    </div>
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
        <label className="text-xs font-semibold text-slate-500">
          Category Name
        </label>
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
            <Input
              value={link.label}
              onChange={(v) => onLinkChange({ ...link, label: v })}
              placeholder="Label"
            />
            <SelectInput
              value={link.href}
              onChange={(v) => onLinkChange({ ...link, href: v })}
            />
          </div>
        )}
      />
    </div>
  );
}

export default function FooterForm({ initial }: { initial: FooterContent }) {
  const [data, setData] = useState<FooterContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

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
      <FormGroup title="Brand">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Logo Text">
            <Input value={data.logoText} onChange={(v) => set("logoText", v)} />
          </Field>
          <Field label="Copyright Text">
            <Input
              value={data.copyright}
              onChange={(v) => set("copyright", v)}
            />
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
      </FormGroup>

      <FormGroup title="Link Groups">
        <ArrayField<FooterLinkGroup>
          label=""
          items={data.linkGroups}
          onChange={(v) => set("linkGroups", v)}
          createItem={() => ({ category: "New Group", links: [] })}
          renderItem={(group, _i, onChange) => (
            <LinkGroupEditor group={group} onChange={onChange} />
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
