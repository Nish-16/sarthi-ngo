import { readContent } from "@/lib/content";
import WhyJoinForm from "@/components/admin/forms/get-involved/WhyJoinForm";

export default function GetInvolvedWhyJoinAdminPage() {
  const { getInvolved } = readContent();
  return <WhyJoinForm initial={getInvolved.whyJoin} />;
}
