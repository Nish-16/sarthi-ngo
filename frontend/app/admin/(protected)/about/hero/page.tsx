import { readContent } from "@/lib/content";
import AboutHeroForm from "@/components/admin/forms/about/HeroForm";

export default async function AboutHeroAdminPage() {
  const { about } = await readContent();
  return <AboutHeroForm initial={about.hero} />;
}
