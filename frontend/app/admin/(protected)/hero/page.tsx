import { readContent } from "@/lib/content";
import HeroForm from "@/components/admin/forms/HeroForm";

export default function HeroAdminPage() {
  const { hero } = readContent();
  return <HeroForm initial={hero} />;
}
