import { readContent } from "@/lib/content";
import ImpactForm from "@/components/admin/forms/what-we-do/ImpactForm";

export default function WwdImpactAdminPage() {
  const { whatWeDo } = readContent();
  return <ImpactForm initial={whatWeDo.impact} />;
}
