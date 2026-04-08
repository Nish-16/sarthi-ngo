import { readGetInvolved } from "@/lib/content";
import GetInvolvedHeroForm from "@/components/admin/forms/get-involved/HeroForm";

export default async function GetInvolvedHeroAdminPage() {
  const getInvolved = await readGetInvolved();
  return <GetInvolvedHeroForm initial={getInvolved.hero} />;
}
