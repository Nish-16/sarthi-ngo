import { readContent } from "@/lib/content";
import RecognitionsForm from "@/components/admin/forms/RecognitionsForm";

export default async function RecognitionsAdminPage() {
  const { recognitions } = await readContent();
  return <RecognitionsForm initial={recognitions} />;
}
