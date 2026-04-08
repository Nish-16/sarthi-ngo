import { readHome } from "@/lib/content";
import ImpactStatsForm from "@/components/admin/forms/ImpactStatsForm";

export default async function ImpactAdminPage() {
  const home = await readHome();
  return <ImpactStatsForm initial={home.impactStats} />;
}
