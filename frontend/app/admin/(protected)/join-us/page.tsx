import { readContent } from "@/lib/content";
import JoinUsForm from "@/components/admin/forms/JoinUsForm";

export default async function JoinUsAdminPage() {
  const { joinUs } = await readContent();
  return <JoinUsForm initial={joinUs} />;
}
