import { readContent } from "@/lib/content";
import HeroForm from "@/components/admin/forms/HeroForm";

export default async function HeroAdminPage() {
  const { hero } = await readContent();
  return <HeroForm initial={hero} />;
}
