import { readHome } from "@/lib/content";
import JoinUsForm from "@/components/admin/forms/JoinUsForm";

export default async function JoinUsAdminPage() {
  const home = await readHome();
  return <JoinUsForm initial={home.joinUs} />;
}
