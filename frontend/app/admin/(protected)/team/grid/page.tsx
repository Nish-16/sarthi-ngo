import { readTeam } from "@/lib/content";
import TeamGridForm from "@/components/admin/forms/team/TeamGridForm";

export default async function TeamGridAdminPage() {
  const team = await readTeam();
  return <TeamGridForm initial={team.grid} />;
}
