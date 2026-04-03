import { readContent } from "@/lib/content";
import CollaborateForm from "@/components/admin/forms/get-involved/CollaborateForm";

export default function GetInvolvedCollaborateAdminPage() {
  const { getInvolved } = readContent();
  return <CollaborateForm initial={getInvolved.collaborate} />;
}
