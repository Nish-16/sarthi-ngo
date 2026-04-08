import { readWhatWeDo } from "@/lib/content";
import ImpactForm from "@/components/admin/forms/what-we-do/ImpactForm";

export default async function WwdImpactAdminPage() {
  const whatWeDo = await readWhatWeDo();
  return <ImpactForm initial={whatWeDo.impact} />;
}
