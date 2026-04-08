import { readTeam } from "@/lib/content";
import TeamHeroForm from "@/components/admin/forms/team/HeroForm";

export default async function TeamHeroAdminPage() {
  const team = await readTeam();
  return <TeamHeroForm initial={team.hero} />;
}
