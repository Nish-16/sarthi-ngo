import { readContent } from "@/lib/content";
import TeamGridForm from "@/components/admin/forms/team/TeamGridForm";

export default function TeamGridAdminPage() {
  const { team } = readContent();
  return <TeamGridForm initial={team.grid} />;
}
