"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedStats } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import { toPickerHex } from "@/lib/color";
import type {
  GetInvolvedStatItem,
  GetInvolvedStatsContent,
} from "@/types/content";

const DEFAULT_STAT_COLOR = "#6366f1";
const DEFAULT_ICON_BOX_COLOR = "#818cf8";

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
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    />
  );
}

export default function StatsForm({
  initial,
}: {
  initial: GetInvolvedStatsContent;
}) {
  const [data, setData] = useState<GetInvolvedStatsContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedStatsContent>(
    key: K,
    value: GetInvolvedStatsContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Impact Stats"
      description="Dark impact numbers section."
      onSave={async () => setResult(await saveGetInvolvedStats(data))}
      saveResult={result}
    >
      <FormGroup title="Header">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
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

      <FormGroup title="Stat Cards">
        <ArrayField<GetInvolvedStatItem>
          items={data.items}
          onChange={(v) => set("items", v)}
          createItem={() => ({
            value: "",
            label: "",
            description: "",
            iconName: "Users",
            gradient: DEFAULT_STAT_COLOR,
            iconColor: DEFAULT_ICON_BOX_COLOR,
          })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Value">
                <Input
                  value={item.value}
                  onChange={(v) => onChange({ ...item, value: v })}
                />
              </Field>
              <Field label="Label">
                <Input
                  value={item.label}
                  onChange={(v) => onChange({ ...item, label: v })}
                />
              </Field>
              <Field label="Description">
                <Input
                  value={item.description}
                  onChange={(v) => onChange({ ...item, description: v })}
                />
              </Field>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Icon
                </label>
                <select
                  value={item.iconName}
                  onChange={(e) =>
                    onChange({ ...item, iconName: e.target.value })
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
              <Field label="Stat Color">
                <input
                  type="color"
                  value={toPickerHex(item.gradient, DEFAULT_STAT_COLOR)}
                  onChange={(e) =>
                    onChange({ ...item, gradient: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </Field>
              <Field label="Icon Box Color">
                <input
                  type="color"
                  value={toPickerHex(item.iconColor, DEFAULT_ICON_BOX_COLOR)}
                  onChange={(e) =>
                    onChange({ ...item, iconColor: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
