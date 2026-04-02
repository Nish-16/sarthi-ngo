import Image from "next/image";
import SocialIcons from "@/components/ui/SocialIcons";

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  linkedin?: string;
  email?: string;
  accentColor: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 hover:-translate-y-2 transition-all duration-500">
      {/* image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* gradient fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        {/* department tag */}
        <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/85 backdrop-blur-sm text-slate-600 border border-slate-100">
          {member.department}
        </span>
      </div>

      {/* content */}
      <div className="px-6 pb-6 -mt-2 relative">
        {/* accent line */}
        <div className={`w-8 h-1 rounded-full mb-4 ${member.accentColor}`} />

        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-slate-500 font-medium">{member.role}</p>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <SocialIcons linkedin={member.linkedin} email={member.email} />
          {/* hover arrow */}
          <span className="text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-1 group-hover:translate-x-0">
            View profile →
          </span>
        </div>
      </div>
    </article>
  );
}
