import TeamCard, { type TeamMember } from "./TeamCard";

const leadership: TeamMember[] = [
  {
    name: "Arjun Mehta",
    role: "Founder & Executive Director",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "arjun@sarthi.org",
    accentColor: "bg-indigo-500",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & Programs Lead",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "priya@sarthi.org",
    accentColor: "bg-purple-500",
  },
  {
    name: "Rohan Verma",
    role: "Head of Community Outreach",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "rohan@sarthi.org",
    accentColor: "bg-cyan-500",
  },
  {
    name: "Sneha Patel",
    role: "Director of Partnerships",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "sneha@sarthi.org",
    accentColor: "bg-orange-500",
  },
];

const coreTeam: TeamMember[] = [
  {
    name: "Vikram Nair",
    role: "Field Programs Coordinator",
    department: "Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "vikram@sarthi.org",
    accentColor: "bg-emerald-500",
  },
  {
    name: "Ananya Singh",
    role: "Education & Skilling Lead",
    department: "Programs",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "ananya@sarthi.org",
    accentColor: "bg-rose-500",
  },
  {
    name: "Kabir Joshi",
    role: "Digital & Communications",
    department: "Operations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "kabir@sarthi.org",
    accentColor: "bg-amber-500",
  },
  {
    name: "Meera Iyer",
    role: "Climate Action Coordinator",
    department: "Programs",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    linkedin: "https://linkedin.com",
    email: "meera@sarthi.org",
    accentColor: "bg-teal-500",
  },
];

interface TeamGroupProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

function TeamGroup({ title, subtitle, members }: TeamGroupProps) {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

export default function TeamGrid() {
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
        <TeamGroup
          title="Leadership Team"
          subtitle="The founding members and senior leaders steering our mission."
          members={leadership}
        />
        <TeamGroup
          title="Core Team"
          subtitle="The dedicated coordinators and specialists who make programs happen on the ground."
          members={coreTeam}
        />
      </div>
    </section>
  );
}
