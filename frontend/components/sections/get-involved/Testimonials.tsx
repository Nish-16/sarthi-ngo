import Image from "next/image";
import Container from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "Volunteering with Sarthi was the most formative six months of my life. I ran workshops for 80 students and came back with more skills than I gave.",
    name: "Riya Kapoor",
    role: "Volunteer, 2023 · Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    accent: "border-t-indigo-500",
    tag: "Volunteer",
  },
  {
    quote:
      "My internship here was nothing like a corporate placement. I co-designed a real program, tracked outcomes, and saw direct community response — all in 3 months.",
    name: "Aryan Dubey",
    role: "Intern, 2024 · Pune",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    accent: "border-t-orange-500",
    tag: "Intern",
  },
  {
    quote:
      "As a CSR partner, Sarthi gave us full visibility into how our funds were used. The impact reports were detailed, honest, and genuinely compelling.",
    name: "Smita Nair",
    role: "Corporate Partner · Mumbai",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    accent: "border-t-emerald-500",
    tag: "Partner",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Voices From Our Community
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Hear it from those{" "}
            <span className="relative inline-block">
              <span className="text-indigo-600">who showed up</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-400 rounded-full" />
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, image, accent, tag }) => (
            <article
              key={name}
              className={`group relative bg-slate-50 rounded-3xl p-7 border border-slate-100 border-t-2 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 ${accent}`}
            >
              {/* decorative quote mark */}
              <span className="absolute top-5 right-6 text-6xl font-black text-slate-200 leading-none select-none pointer-events-none">
                "
              </span>

              {/* tag */}
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                {tag}
              </span>

              <p className="text-slate-700 leading-relaxed text-[15px] relative z-10">
                "{quote}"
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white shadow-md">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-none">{name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
