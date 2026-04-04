import { readContent } from "@/lib/content";
import TeamHeroForm from "@/components/admin/forms/team/HeroForm";

export default function TeamHeroAdminPage() {
  const { team } = readContent();
  return <TeamHeroForm initial={team.hero} />;
}
