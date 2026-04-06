import { readContent } from "@/lib/content";
import GetInvolvedHeroForm from "@/components/admin/forms/get-involved/HeroForm";

export default async function GetInvolvedHeroAdminPage() {
  const { getInvolved } = await readContent();
  return <GetInvolvedHeroForm initial={getInvolved.hero} />;
}
