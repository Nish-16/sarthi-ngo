import { readContent } from "@/lib/content";
import VolunteerForm from "@/components/admin/forms/get-involved/VolunteerForm";

export default async function GetInvolvedVolunteerAdminPage() {
  const { getInvolved } = await readContent();
  return <VolunteerForm initial={getInvolved.volunteer} />;
}
