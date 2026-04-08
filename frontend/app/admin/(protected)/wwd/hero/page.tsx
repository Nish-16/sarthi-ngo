import { readWhatWeDo } from "@/lib/content";
import WwdHeroForm from "@/components/admin/forms/what-we-do/HeroForm";

export default async function WwdHeroAdminPage() {
  const whatWeDo = await readWhatWeDo();
  return <WwdHeroForm initial={whatWeDo.hero} />;
}
