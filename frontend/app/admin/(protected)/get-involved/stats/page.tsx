import { readContent } from "@/lib/content";
import StatsForm from "@/components/admin/forms/get-involved/StatsForm";

export default function GetInvolvedStatsAdminPage() {
  const { getInvolved } = readContent();
  return <StatsForm initial={getInvolved.stats} />;
}
