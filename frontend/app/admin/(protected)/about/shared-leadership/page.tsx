import { readAbout } from "@/lib/content";
import SharedLeadershipForm from "@/components/admin/forms/about/SharedLeadershipForm";

export default async function AboutSharedLeadershipAdminPage() {
  const about = await readAbout();
  return <SharedLeadershipForm initial={about.sharedLeadership} />;
}
