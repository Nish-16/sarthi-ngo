import { readContent } from "@/lib/content";
import InvolvementGridForm from "@/components/admin/forms/get-involved/InvolvementGridForm";

export default function GetInvolvedInvolvementGridAdminPage() {
  const { getInvolved } = readContent();
  return <InvolvementGridForm initial={getInvolved.involvementGrid} />;
}
