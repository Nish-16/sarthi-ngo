import Image from "next/image";
import SocialIcons from "@/components/ui/SocialIcons";
import type { TeamMemberContent } from "@/types/content";

export default function TeamCard({ member }: { member: TeamMemberContent }) {
  return (
    <article className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-500">
      {/* image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/85 backdrop-blur-sm text-slate-600 border border-white/60">
          {member.department}
        </span>
      </div>

      <div className="px-6 py-5">
        <div className={`w-7 h-1 rounded-full mb-3 ${member.accentColor}`} />
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{member.role}</p>

        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
          <SocialIcons linkedin={member.linkedin} email={member.email} />
          <span className="text-xs font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View →
          </span>
        </div>
      </div>
    </article>
  );
}
