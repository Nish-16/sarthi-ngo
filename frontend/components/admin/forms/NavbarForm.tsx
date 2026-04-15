"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveNavbar } from "@/app/actions/content";
import type { NavbarContent, NavLink } from "@/types/content";

const NAV_DESTINATIONS = [
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
  const hasPreset = NAV_DESTINATIONS.some((item) => item.value === value);
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
        {NAV_DESTINATIONS.map((item) => (
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

export default function NavbarForm({ initial }: { initial: NavbarContent }) {
  const [data, setData] = useState<NavbarContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

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
      <FormGroup title="Brand & CTA">
        <Field label="Logo Text">
          <Input
            value={data.logoText}
            onChange={(v) => set("logoText", v)}
            placeholder="Sarthi"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="CTA Button Label">
            <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          </Field>
          <Field label="CTA Button Destination">
            <SelectInput
              value={data.ctaHref}
              onChange={(v) => set("ctaHref", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Navigation Links">
        <ArrayField<NavLink>
          label=""
          items={data.links}
          onChange={(v) => set("links", v)}
          createItem={() => ({ label: "", href: "#" })}
          renderItem={(link, _i, onChange) => (
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={link.label}
                onChange={(v) => onChange({ ...link, label: v })}
                placeholder="Link label"
              />
              <SelectInput
                value={link.href}
                onChange={(v) => onChange({ ...link, href: v })}
              />
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
