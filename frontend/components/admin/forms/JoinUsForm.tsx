"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import { saveJoinUs } from "@/app/actions/content";
import type { JoinUsContent } from "@/types/content";
import { CheckCircle } from "lucide-react";

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

function JoinUsPreview({ data }: { data: JoinUsContent }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative rounded-2xl overflow-hidden bg-white border border-slate-100"
        style={{ height: 200 }}
      >
        {/* Diagonal orange panel */}
        <div
          className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500"
          style={{ clipPath: "polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />

        {/* Concentric rings */}
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-white/25" />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 translate-x-7 w-18 h-18 rounded-full border border-white/35" style={{ width: 72, height: 72 }} />
        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 translate-x-[3.25rem] w-10 h-10 rounded-full bg-white/20" />

        {/* Rotated squares */}
        <div className="absolute top-4 right-6 w-8 h-8 border border-white/30 rotate-[22deg]" />
        <div className="absolute bottom-4 right-6 w-6 h-6 border border-white/25 rotate-[15deg]" />
        <div className="absolute top-5 right-5 w-3 h-3 bg-white/15 rotate-45" />

        {/* Small diamonds */}
        <div className="absolute top-1/4 right-[38%] w-2 h-2 bg-white/30 rotate-45" />
        <div className="absolute bottom-1/4 right-[32%] w-1.5 h-1.5 bg-white/35 rotate-45" />

        {/* Cross mark */}
        <div className="absolute top-1/3 right-[42%] opacity-30">
          <div className="relative w-3 h-3">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white" />
          </div>
        </div>

        {/* Bleed shapes at diagonal edge */}
        <div className="absolute top-[30%] left-[41%] w-3 h-3 bg-amber-400/60 rotate-45" />
        <div className="absolute top-[60%] left-[40%] w-2 h-2 bg-orange-500/50 rotate-45" />

        {/* Glow */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[34%] w-20 h-20 bg-amber-300/20 rounded-full blur-xl" />

        {/* Text content overlay */}
        <div className="absolute inset-y-0 left-0 w-[52%] flex flex-col justify-center px-7 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="block w-4 h-[1.5px] bg-amber-500 rounded-full" />
            <span className="text-[0.55rem] font-black text-amber-600 uppercase tracking-[0.2em] truncate">
              {data.eyebrow || "Eyebrow"}
            </span>
          </div>

          <p className="text-[0.75rem] font-black text-stone-900 leading-tight">
            {data.headline || "Headline"}{" "}
            <span className="text-amber-500">{data.headlineAccent || "accent"}</span>{" "}
            <span className="text-stone-400 font-light italic">in your community?</span>
          </p>

          <p className="text-[0.58rem] text-stone-500 line-clamp-2 leading-relaxed">
            {data.description || "Description text goes here."}
          </p>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="bg-orange-500 text-white text-[0.5rem] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {data.ctaPrimary || "Join Now"}
            </span>
            <span className="text-[0.5rem] text-stone-400 truncate">
              {data.ctaSecondary || "Learn more"} →
            </span>
          </div>

          {data.badges.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-0.5">
              {data.badges.slice(0, 3).map((b) => (
                <span key={b} className="flex items-center gap-0.5 text-[0.48rem] text-stone-400">
                  <CheckCircle className="w-2 h-2 text-emerald-500 shrink-0" />
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-slate-400">Updates as you edit the fields below.</p>
    </div>
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
      description="Diagonal warm split section with geometric shapes."
      onSave={async () => setResult(await saveJoinUs(data))}
      saveResult={result}
    >
      <FormGroup title="Live Preview">
        <JoinUsPreview data={data} />
      </FormGroup>

      <FormGroup title="Text Content">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </FormGroup>

      <FormGroup title="Call to Action">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      </FormGroup>

      <FormGroup title="Trust Badges">
        <ArrayField<string>
          label=""
          items={data.badges}
          onChange={(v) => set("badges", v)}
          createItem={() => ""}
          renderItem={(badge, _i, onChange) => (
            <Input value={badge} onChange={onChange} placeholder="Free to join" />
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
