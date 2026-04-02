import { readContent } from "@/lib/content";
import RecognitionsForm from "@/components/admin/forms/RecognitionsForm";

export default function RecognitionsAdminPage() {
  const { recognitions } = readContent();
  return <RecognitionsForm initial={recognitions} />;
}
