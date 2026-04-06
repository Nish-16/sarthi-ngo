import { readContent } from "@/lib/content";
import TeamHeroForm from "@/components/admin/forms/team/HeroForm";

export default async function TeamHeroAdminPage() {
  const { team } = await readContent();
  return <TeamHeroForm initial={team.hero} />;
}
