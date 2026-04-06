import { readContent } from "@/lib/content";
import WhyJoinForm from "@/components/admin/forms/get-involved/WhyJoinForm";

export default async function GetInvolvedWhyJoinAdminPage() {
  const { getInvolved } = await readContent();
  return <WhyJoinForm initial={getInvolved.whyJoin} />;
}
