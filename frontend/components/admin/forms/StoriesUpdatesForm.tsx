"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import ArrayField from "../ArrayField";
import ImageUploader from "../ImageUploader";
import { saveStoriesUpdates } from "@/app/actions/content";
import type { StoriesUpdatesContent, StoryItem, StorySize } from "@/types/content";

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

const CATEGORIES = ["Story", "Update", "Event"];
const SIZES: StorySize[] = ["tall", "normal", "wide"];

export default function StoriesUpdatesForm({ initial }: { initial: StoriesUpdatesContent }) {
  const [data, setData] = useState<StoriesUpdatesContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  function set<K extends keyof StoriesUpdatesContent>(key: K, value: StoriesUpdatesContent[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Stories & Updates"
      description="Masonry-style grid of stories. First item should be 'tall', last should be 'wide'."
      onSave={async () => setResult(await saveStoriesUpdates(data))}
      saveResult={result}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Eyebrow">
          <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
        </Field>
        <Field label="CTA Label">
          <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Headline">
          <Input value={data.headline} onChange={(v) => set("headline", v)} />
        </Field>
        <Field label="Headline Accent">
          <Input value={data.headlineAccent} onChange={(v) => set("headlineAccent", v)} />
        </Field>
      </div>

      <hr className="border-slate-100" />
      <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
        Tip: Use <strong>tall</strong> for the first item (left column, 2 rows), <strong>normal</strong> for middle items, and <strong>wide</strong> for the last item (2 columns).
      </p>

      <ArrayField<StoryItem>
        label="Stories (4 recommended)"
        items={data.items}
        onChange={(v) => set("items", v)}
        maxItems={6}
        createItem={() => ({ image: "", size: "normal", category: "Story", title: "" })}
        renderItem={(item, _i, onChange) => (
          <div className="flex flex-col gap-3">
            <ImageUploader
              label="Story Image"
              value={item.image}
              onChange={(url) => onChange({ ...item, image: url })}
              aspectRatio="4/3"
            />
            <Input value={item.title} onChange={(v) => onChange({ ...item, title: v })} placeholder="Story title" />
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Category</label>
                <select
                  value={item.category}
                  onChange={(e) => onChange({ ...item, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">Grid Size</label>
                <select
                  value={item.size}
                  onChange={(e) => onChange({ ...item, size: e.target.value as StorySize })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      />
    </SectionShell>
  );
}
