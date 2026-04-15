"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveWwdApproach } from "@/app/actions/content";
import { iconNames } from "@/lib/icon-map";
import { toPickerHex } from "@/lib/color";
import type { WwdApproachContent, WwdApproachStep } from "@/types/content";

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

const DEFAULT_STEP_COLOR = "#06b6d4";

export default function ApproachForm({
  initial,
}: {
  initial: WwdApproachContent;
}) {
  const [data, setData] = useState<WwdApproachContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof WwdApproachContent>(
    key: K,
    value: WwdApproachContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Our Approach"
      description="Dark section with step cards and an aside image."
      onSave={async () => setResult(await saveWwdApproach(data))}
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
            <Input
              value={data.headlineAccent}
              onChange={(v) => set("headlineAccent", v)}
            />
          </Field>
        </div>
      </FormGroup>

      <FormGroup title="Image & Quote">
        <ImageUploader
          label="Primary Image"
          value={data.image}
          onChange={(url) => set("image", url)}
          aspectRatio="16/9"
        />
        <Field label="Image Alt Text">
          <Input value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
        </Field>
        <Field label="Quote Card Text">
          <textarea
            value={data.quoteCard}
            rows={2}
            onChange={(e) => set("quoteCard", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
          />
        </Field>
      </FormGroup>

      <FormGroup title="Gallery Photos (Carousel)">
        <p className="text-xs text-slate-400 -mt-1 mb-1">
          Add extra photos to display alongside the primary image in the
          carousel. The primary image above is always shown first.
        </p>
        <ArrayField<{ src: string; alt: string }>
          items={data.images ?? []}
          onChange={(v) => set("images", v)}
          createItem={() => ({ src: "", alt: "" })}
          renderItem={(img, _i, onChangeItem) => (
            <div className="flex flex-col gap-3">
              <ImageUploader
                label="Photo"
                value={img.src}
                onChange={(url) => onChangeItem({ ...img, src: url })}
                aspectRatio="16/9"
              />
              <Field label="Alt Text">
                <Input
                  value={img.alt}
                  onChange={(v) => onChangeItem({ ...img, alt: v })}
                  placeholder="A short description of the photo"
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>

      <FormGroup title="Steps">
        <ArrayField<WwdApproachStep>
          items={data.steps}
          onChange={(v) => set("steps", v)}
          createItem={() => ({
            title: "",
            description: "",
            iconName: "Zap",
            color: DEFAULT_STEP_COLOR,
          })}
          renderItem={(step, _i, onChange) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Step Title">
                  <Input
                    value={step.title}
                    onChange={(v) => onChange({ ...step, title: v })}
                    placeholder="Listen"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">
                      Icon
                    </label>
                    <select
                      value={step.iconName}
                      onChange={(e) =>
                        onChange({ ...step, iconName: e.target.value })
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
                      Color
                    </label>
                    <input
                      type="color"
                      value={toPickerHex(step.color, DEFAULT_STEP_COLOR)}
                      onChange={(e) =>
                        onChange({ ...step, color: e.target.value })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <textarea
                value={step.description}
                rows={2}
                placeholder="Step description"
                onChange={(e) =>
                  onChange({ ...step, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
              />
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
