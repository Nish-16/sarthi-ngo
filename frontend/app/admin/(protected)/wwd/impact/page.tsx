import { readContent } from "@/lib/content";
import ImpactForm from "@/components/admin/forms/what-we-do/ImpactForm";

export default async function WwdImpactAdminPage() {
  const { whatWeDo } = await readContent();
  return <ImpactForm initial={whatWeDo.impact} />;
}
