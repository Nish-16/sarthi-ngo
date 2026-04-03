"use client";

import { useState } from "react";
import SectionShell from "../../SectionShell";
import FormGroup from "../../FormGroup";
import ArrayField from "../../ArrayField";
import ImageUploader from "../../ImageUploader";
import { saveTeamGrid } from "@/app/actions/content";
import type { TeamGridContent, TeamGroupContent, TeamMemberContent } from "@/types/content";

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

const ACCENT_COLORS = [
  { label: "Indigo", value: "bg-indigo-500" },
  { label: "Purple", value: "bg-purple-500" },
  { label: "Cyan", value: "bg-cyan-500" },
  { label: "Orange", value: "bg-orange-500" },
  { label: "Emerald", value: "bg-emerald-500" },
  { label: "Rose", value: "bg-rose-500" },
  { label: "Amber", value: "bg-amber-500" },
  { label: "Teal", value: "bg-teal-500" },
  { label: "Pink", value: "bg-pink-500" },
  { label: "Sky", value: "bg-sky-500" },
];

function MemberEditor({
  member,
  onChange,
}: {
  member: TeamMemberContent;
  onChange: (m: TeamMemberContent) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <ImageUploader
        label="Photo"
        value={member.image}
        onChange={(url) => onChange({ ...member, image: url })}
        aspectRatio="3/4"
      />
      <div className="grid grid-cols-2 gap-2">
        <Field label="Name">
          <Input value={member.name} onChange={(v) => onChange({ ...member, name: v })} placeholder="Arjun Mehta" />
        </Field>
        <Field label="Department">
          <Input value={member.department} onChange={(v) => onChange({ ...member, department: v })} placeholder="Leadership" />
        </Field>
      </div>
      <Field label="Role">
        <Input value={member.role} onChange={(v) => onChange({ ...member, role: v })} placeholder="Founder & Executive Director" />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="LinkedIn URL">
          <Input value={member.linkedin} onChange={(v) => onChange({ ...member, linkedin: v })} placeholder="https://linkedin.com/in/..." />
        </Field>
        <Field label="Email">
          <Input value={member.email} onChange={(v) => onChange({ ...member, email: v })} placeholder="name@sarthi.org" />
        </Field>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700">Accent Colour</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange({ ...member, accentColor: c.value })}
              title={c.label}
              className={`w-6 h-6 rounded-full ${c.value} transition-all ${
                member.accentColor === c.value
                  ? "ring-2 ring-offset-2 ring-indigo-500 scale-110"
                  : "hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamGridForm({ initial }: { initial: TeamGridContent }) {
  const [data, setData] = useState<TeamGridContent>(initial);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  return (
    <SectionShell
      title="Team Grid"
      description="Groups of team members — add as many groups and members as you need."
      onSave={async () => setResult(await saveTeamGrid(data))}
      saveResult={result}
    >
      <FormGroup title="Groups" description="Each group has a title, subtitle, and its own set of members">
        <ArrayField<TeamGroupContent>
          items={data.groups}
          onChange={(groups) => setData({ groups })}
          createItem={() => ({ title: "New Group", subtitle: "", members: [] })}
          renderItem={(group, _i, onGroupChange) => (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Group Title">
                  <Input
                    value={group.title}
                    onChange={(v) => onGroupChange({ ...group, title: v })}
                    placeholder="Leadership Team"
                  />
                </Field>
                <Field label="Group Subtitle">
                  <Input
                    value={group.subtitle}
                    onChange={(v) => onGroupChange({ ...group, subtitle: v })}
                    placeholder="The founding members steering our mission."
                  />
                </Field>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <ArrayField<TeamMemberContent>
                  label="Members"
                  items={group.members}
                  onChange={(members) => onGroupChange({ ...group, members })}
                  createItem={() => ({
                    name: "",
                    role: "",
                    department: "",
                    image: "",
                    linkedin: "",
                    email: "",
                    accentColor: "bg-indigo-500",
                  })}
                  renderItem={(member, _j, onMemberChange) => (
                    <MemberEditor member={member} onChange={onMemberChange} />
                  )}
                />
              </div>
            </div>
          )}
        />
      </FormGroup>
    </SectionShell>
  );
}
