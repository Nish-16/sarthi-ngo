import { readHome } from "@/lib/content";
import HeroForm from "@/components/admin/forms/HeroForm";

export default async function HeroAdminPage() {
  const home = await readHome();
  return <HeroForm initial={home.hero} />;
}
