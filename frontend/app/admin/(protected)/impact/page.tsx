import { readContent } from "@/lib/content";
import ImpactStatsForm from "@/components/admin/forms/ImpactStatsForm";

export default function ImpactAdminPage() {
  const { impactStats } = readContent();
  return <ImpactStatsForm initial={impactStats} />;
}
