import { readAbout } from "@/lib/content";
import AboutHeroForm from "@/components/admin/forms/about/HeroForm";

export default async function AboutHeroAdminPage() {
  const about = await readAbout();
  return <AboutHeroForm initial={about.hero} />;
}
