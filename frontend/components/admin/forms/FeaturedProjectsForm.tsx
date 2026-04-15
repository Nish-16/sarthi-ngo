"use client";

import { useState } from "react";
import SectionShell from "../SectionShell";
import FormGroup from "../FormGroup";
import ArrayField from "../ArrayField";
import ImageUploader from "../ImageUploader";
import { saveFeaturedProjects } from "@/app/actions/content";
import type { FeaturedProjectsContent, ProjectItem } from "@/types/content";

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

const TAG_COLORS = [
  { label: "Indigo", value: "bg-indigo-100 text-indigo-700" },
  { label: "Emerald", value: "bg-emerald-100 text-emerald-700" },
  { label: "Purple", value: "bg-purple-100 text-purple-700" },
  { label: "Orange", value: "bg-orange-100 text-orange-700" },
  { label: "Rose", value: "bg-rose-100 text-rose-700" },
  { label: "Teal", value: "bg-teal-100 text-teal-700" },
];

const CLIP_PATHS = [
  {
    label: "Bottom-right slant",
    value: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
  },
  {
    label: "Diagonal left-right",
    value: "polygon(0 8%, 100% 0, 100% 100%, 0 92%)",
  },
  {
    label: "Top-right slant",
    value: "polygon(0 0, 100% 8%, 100% 100%, 0 100%)",
  },
  { label: "Straight", value: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];

export default function FeaturedProjectsForm({
  initial,
}: {
  initial: FeaturedProjectsContent;
}) {
  const [data, setData] = useState<FeaturedProjectsContent>(initial);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  function set<K extends keyof FeaturedProjectsContent>(
    key: K,
    value: FeaturedProjectsContent[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <SectionShell
      title="Featured Projects"
      description="Project cards with images, tags, and stats."
      onSave={async () => setResult(await saveFeaturedProjects(data))}
      saveResult={result}
    >
      <FormGroup title="Section Header">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Eyebrow">
            <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
          </Field>
          <Field label="CTA Label">
            <Input value={data.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

      <FormGroup title="Projects" description="Up to 6 project cards">
        <ArrayField<ProjectItem>
          label=""
          items={data.projects}
          onChange={(v) => set("projects", v)}
          maxItems={6}
          createItem={() => ({
            image: "",
            tag: "Education",
            tagColor: "bg-indigo-100 text-indigo-700",
            title: "",
            description: "",
            stat: "",
            clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
          })}
          renderItem={(proj, _i, onChange) => (
            <div className="flex flex-col gap-3">
              <ImageUploader
                label="Project Image"
                value={proj.image}
                onChange={(url) => onChange({ ...proj, image: url })}
                aspectRatio="16/9"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">
                    Tag Label
                  </label>
                  <Input
                    value={proj.tag}
                    onChange={(v) => onChange({ ...proj, tag: v })}
                    placeholder="Education"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-500">
                    Tag Color
                  </label>
                  <select
                    value={proj.tagColor}
                    onChange={(e) =>
                      onChange({ ...proj, tagColor: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {TAG_COLORS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                value={proj.title}
                onChange={(v) => onChange({ ...proj, title: v })}
                placeholder="Project title"
              />
              <textarea
                value={proj.description}
                rows={2}
                placeholder="Short description"
                onChange={(e) =>
                  onChange({ ...proj, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
              />
              <Input
                value={proj.stat}
                onChange={(v) => onChange({ ...proj, stat: v })}
                placeholder="12,000+ students reached"
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500">
                  Image Clip Path
                </label>
                <select
                  value={proj.clipPath}
                  onChange={(e) =>
                    onChange({ ...proj, clipPath: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {CLIP_PATHS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
