import { readContent } from "@/lib/content";
import SharedLeadershipForm from "@/components/admin/forms/about/SharedLeadershipForm";

export default async function AboutSharedLeadershipAdminPage() {
  const { about } = await readContent();
  return <SharedLeadershipForm initial={about.sharedLeadership} />;
}
