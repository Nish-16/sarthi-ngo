import { readContent } from "@/lib/content";
import AboutHeroForm from "@/components/admin/forms/about/HeroForm";

export default function AboutHeroAdminPage() {
  const { about } = readContent();
  return <AboutHeroForm initial={about.hero} />;
}
