import { readHome } from "@/lib/content";
import RecognitionsForm from "@/components/admin/forms/RecognitionsForm";

export default async function RecognitionsAdminPage() {
  const home = await readHome();
  return <RecognitionsForm initial={home.recognitions} />;
}
