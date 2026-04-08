import { readGetInvolved } from "@/lib/content";
import InvolvementGridForm from "@/components/admin/forms/get-involved/InvolvementGridForm";

export default async function GetInvolvedInvolvementGridAdminPage() {
  const getInvolved = await readGetInvolved();
  return <InvolvementGridForm initial={getInvolved.involvementGrid} />;
}
