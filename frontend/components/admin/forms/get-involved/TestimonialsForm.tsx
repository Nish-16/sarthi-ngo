"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import { saveGetInvolvedTestimonials } from "@/app/actions/content";
import { toPickerHex } from "@/lib/color";
import type {
  GetInvolvedTestimonialItem,
  GetInvolvedTestimonialsContent,
} from "@/types/content";

const DEFAULT_TESTIMONIAL_ACCENT = "#6366f1";

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

export default function TestimonialsForm({
  initial,
}: {
  initial: GetInvolvedTestimonialsContent;
}) {
  const [data, setData] = useState<GetInvolvedTestimonialsContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof GetInvolvedTestimonialsContent>(
    key: K,
    value: GetInvolvedTestimonialsContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Testimonials"
      description="Community stories and testimonial cards."
      onSave={async () => setResult(await saveGetInvolvedTestimonials(data))}
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

      <FormGroup title="Testimonial Items">
        <ArrayField<GetInvolvedTestimonialItem>
          items={data.items}
          onChange={(v) => set("items", v)}
          createItem={() => ({
            quote: "",
            name: "",
            role: "",
            image: "",
            accent: DEFAULT_TESTIMONIAL_ACCENT,
            tag: "Volunteer",
          })}
          renderItem={(item, _i, onChange) => (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name">
                <Input
                  value={item.name}
                  onChange={(v) => onChange({ ...item, name: v })}
                />
              </Field>
              <Field label="Tag">
                <Input
                  value={item.tag}
                  onChange={(v) => onChange({ ...item, tag: v })}
                />
              </Field>
              <Field label="Role">
                <Input
                  value={item.role}
                  onChange={(v) => onChange({ ...item, role: v })}
                />
              </Field>
              <Field label="Image URL">
                <Input
                  value={item.image}
                  onChange={(v) => onChange({ ...item, image: v })}
                />
              </Field>
              <Field label="Card Accent Color">
                <input
                  type="color"
                  value={toPickerHex(item.accent, DEFAULT_TESTIMONIAL_ACCENT)}
                  onChange={(e) =>
                    onChange({ ...item, accent: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1 cursor-pointer"
                />
              </Field>
              <Field label="Quote">
                <Input
                  value={item.quote}
                  onChange={(v) => onChange({ ...item, quote: v })}
                />
              </Field>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
