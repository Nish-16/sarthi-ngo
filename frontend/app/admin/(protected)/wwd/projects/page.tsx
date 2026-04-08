import { readWhatWeDo } from "@/lib/content";
import SignatureProjectsForm from "@/components/admin/forms/what-we-do/SignatureProjectsForm";

export default async function WwdProjectsAdminPage() {
  const whatWeDo = await readWhatWeDo();
  return <SignatureProjectsForm initial={whatWeDo.signatureProjects} />;
}
