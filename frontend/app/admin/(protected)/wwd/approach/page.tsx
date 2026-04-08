import { readWhatWeDo } from "@/lib/content";
import ApproachForm from "@/components/admin/forms/what-we-do/ApproachForm";

export default async function WwdApproachAdminPage() {
  const whatWeDo = await readWhatWeDo();
  return <ApproachForm initial={whatWeDo.approach} />;
}
