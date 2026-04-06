import { readContent } from "@/lib/content";
import ImpactStatsForm from "@/components/admin/forms/ImpactStatsForm";

export default async function ImpactAdminPage() {
  const { impactStats } = await readContent();
  return <ImpactStatsForm initial={impactStats} />;
}
