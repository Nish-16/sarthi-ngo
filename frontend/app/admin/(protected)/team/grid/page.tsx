import { readContent } from "@/lib/content";
import TeamGridForm from "@/components/admin/forms/team/TeamGridForm";

export default async function TeamGridAdminPage() {
  const { team } = await readContent();
  return <TeamGridForm initial={team.grid} />;
}
