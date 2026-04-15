"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveWwdProblem } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import type { WwdProblemContent, WwdGapItem } from "@/types/content";

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

const DEFAULT_GAP_COLOR = "#f97316";

const LEGACY_COLOR_TO_HEX: Array<{ token: string; hex: string }> = [
  { token: "orange", hex: "#f97316" },
  { token: "indigo", hex: "#6366f1" },
  { token: "rose", hex: "#f43f5e" },
  { token: "emerald", hex: "#10b981" },
  { token: "purple", hex: "#a855f7" },
  { token: "cyan", hex: "#06b6d4" },
];

function toHexColor(value: string): string {
  const trimmed = value.trim();
  const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed);
  if (isHex) {
    if (trimmed.length === 4) {
      const [r, g, b] = trimmed.slice(1).split("");
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return trimmed.toLowerCase();
  }

  const lowered = trimmed.toLowerCase();
  const mapped = LEGACY_COLOR_TO_HEX.find((item) =>
    lowered.includes(item.token),
  );
  return mapped?.hex ?? DEFAULT_GAP_COLOR;
}

export default function ProblemForm({
  initial,
}: {
  initial: WwdProblemContent;
}) {
  const [data, setData] = useState<WwdProblemContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof WwdProblemContent>(
    key: K,
    value: WwdProblemContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="The Problem"
      description="Two-column section with text, gap pills, and an image. Use the color picker for pill color."
      onSave={async () => setResult(await saveWwdProblem(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <Field label="Eyebrow">
          <Input
            value={data.eyebrow}
            onChange={(v) => set("eyebrow", v)}
            placeholder="The Problem"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Headline">
            <Input value={data.headline} onChange={(v) => set("headline", v)} />
          </Field>
          <Field label="Headline Accent">
            <Input
              value={data.headlineAccent}
              onChange={(v) => set("headlineAccent", v)}
            />
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
        <ImageUploader
          label="Section Image"
          value={data.image}
          onChange={(url) => set("image", url)}
          aspectRatio="4/3"
        />
        <Field label="Image Alt Text">
          <Input value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Stat Value">
            <Input
              value={data.statValue}
              onChange={(v) => set("statValue", v)}
              placeholder="42+"
            />
          </Field>
          <Field label="Stat Label">
            <Input
              value={data.statLabel}
              onChange={(v) => set("statLabel", v)}
              placeholder="Communities reached"
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Gap Pills">
        <ArrayField<WwdGapItem>
          items={data.gaps}
          onChange={(v) => set("gaps", v)}
          createItem={() => ({
            iconName: "AlertTriangle",
            label: "",
            color: DEFAULT_GAP_COLOR,
          })}
          renderItem={(gap, _i, onChange) => (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Icon
                </label>
                <select
                  value={gap.iconName}
                  onChange={(e) =>
                    onChange({ ...gap, iconName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {iconNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Label
                </label>
                <input
                  type="text"
                  value={gap.label}
                  onChange={(e) => onChange({ ...gap, label: e.target.value })}
                  placeholder="Unequal Learning Access"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Color
                </label>
                <input
                  type="color"
                  value={toHexColor(gap.color)}
                  onChange={(e) => onChange({ ...gap, color: e.target.value })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
