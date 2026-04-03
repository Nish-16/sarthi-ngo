import { readContent } from "@/lib/content";
import SharedLeadershipForm from "@/components/admin/forms/about/SharedLeadershipForm";

export default function AboutSharedLeadershipAdminPage() {
  const { about } = readContent();
  return <SharedLeadershipForm initial={about.sharedLeadership} />;
}
