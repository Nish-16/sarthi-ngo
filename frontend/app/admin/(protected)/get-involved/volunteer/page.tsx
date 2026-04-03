import { readContent } from "@/lib/content";
import VolunteerForm from "@/components/admin/forms/get-involved/VolunteerForm";

export default function GetInvolvedVolunteerAdminPage() {
  const { getInvolved } = readContent();
  return <VolunteerForm initial={getInvolved.volunteer} />;
}
