import { readGetInvolved } from "@/lib/content";
import InviteFoundersForm from "@/components/admin/forms/get-involved/InviteFoundersForm";

export default async function GetInvolvedInviteFoundersAdminPage() {
  const getInvolved = await readGetInvolved();
  return <InviteFoundersForm initial={getInvolved.inviteFounders} />;
}
