import { readGetInvolved } from "@/lib/content";
import VolunteerForm from "@/components/admin/forms/get-involved/VolunteerForm";

export default async function GetInvolvedVolunteerAdminPage() {
  const getInvolved = await readGetInvolved();
  return <VolunteerForm initial={getInvolved.volunteer} />;
}
