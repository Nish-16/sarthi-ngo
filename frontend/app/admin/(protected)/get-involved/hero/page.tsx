import { readContent } from "@/lib/content";
import GetInvolvedHeroForm from "@/components/admin/forms/get-involved/HeroForm";

export default function GetInvolvedHeroAdminPage() {
  const { getInvolved } = readContent();
  return <GetInvolvedHeroForm initial={getInvolved.hero} />;
}
