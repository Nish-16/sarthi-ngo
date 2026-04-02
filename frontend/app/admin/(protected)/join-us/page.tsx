import { readContent } from "@/lib/content";
import JoinUsForm from "@/components/admin/forms/JoinUsForm";

export default function JoinUsAdminPage() {
  const { joinUs } = readContent();
  return <JoinUsForm initial={joinUs} />;
}
