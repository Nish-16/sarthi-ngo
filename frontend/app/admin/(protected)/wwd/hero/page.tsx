import { readContent } from "@/lib/content";
import WwdHeroForm from "@/components/admin/forms/what-we-do/HeroForm";

export default async function WwdHeroAdminPage() {
  const { whatWeDo } = await readContent();
  return <WwdHeroForm initial={whatWeDo.hero} />;
}
