import TeamCard from "./TeamCard";
import type { TeamGridContent } from "@/types/content";

interface Props {
  content: TeamGridContent;
}

export default function TeamGrid({ content }: Props) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />

      {/* dot grid */}
      <div
        className="absolute bottom-16 right-8 w-32 h-32 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {content.groups.map((group) => (
          <div key={group.title}>
            <div className="mb-10">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{group.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{group.subtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.members.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
