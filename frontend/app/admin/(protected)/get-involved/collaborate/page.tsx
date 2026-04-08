import { readGetInvolved } from "@/lib/content";
import CollaborateForm from "@/components/admin/forms/get-involved/CollaborateForm";

export default async function GetInvolvedCollaborateAdminPage() {
  const getInvolved = await readGetInvolved();
  return <CollaborateForm initial={getInvolved.collaborate} />;
}
