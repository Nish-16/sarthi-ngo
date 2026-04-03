import { readContent } from "@/lib/content";
import ApproachForm from "@/components/admin/forms/what-we-do/ApproachForm";

export default function WwdApproachAdminPage() {
  const { whatWeDo } = readContent();
  return <ApproachForm initial={whatWeDo.approach} />;
}
