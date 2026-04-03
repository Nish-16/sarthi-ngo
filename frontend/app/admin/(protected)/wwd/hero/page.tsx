import { readContent } from "@/lib/content";
import WwdHeroForm from "@/components/admin/forms/what-we-do/HeroForm";

export default function WwdHeroAdminPage() {
  const { whatWeDo } = readContent();
  return <WwdHeroForm initial={whatWeDo.hero} />;
}
