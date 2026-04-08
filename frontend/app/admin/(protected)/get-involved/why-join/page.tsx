import { readGetInvolved } from "@/lib/content";
import WhyJoinForm from "@/components/admin/forms/get-involved/WhyJoinForm";

export default async function GetInvolvedWhyJoinAdminPage() {
  const getInvolved = await readGetInvolved();
  return <WhyJoinForm initial={getInvolved.whyJoin} />;
}
