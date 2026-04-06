import { readContent } from "@/lib/content";
import CollaborateForm from "@/components/admin/forms/get-involved/CollaborateForm";

export default async function GetInvolvedCollaborateAdminPage() {
  const { getInvolved } = await readContent();
  return <CollaborateForm initial={getInvolved.collaborate} />;
}
