import { readContent } from "@/lib/content";
import InternForm from "@/components/admin/forms/get-involved/InternForm";

export default function GetInvolvedInternAdminPage() {
  const { getInvolved } = readContent();
  return <InternForm initial={getInvolved.intern} />;
}
