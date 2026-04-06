import { readContent } from "@/lib/content";
import StatsForm from "@/components/admin/forms/get-involved/StatsForm";

export default async function GetInvolvedStatsAdminPage() {
  const { getInvolved } = await readContent();
  return <StatsForm initial={getInvolved.stats} />;
}
