import { readGetInvolved } from "@/lib/content";
import InternForm from "@/components/admin/forms/get-involved/InternForm";

export default async function GetInvolvedInternAdminPage() {
  const getInvolved = await readGetInvolved();
  return <InternForm initial={getInvolved.intern} />;
}
