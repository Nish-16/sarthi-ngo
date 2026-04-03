import { readContent } from "@/lib/content";
import SignatureProjectsForm from "@/components/admin/forms/what-we-do/SignatureProjectsForm";

export default function WwdProjectsAdminPage() {
  const { whatWeDo } = readContent();
  return <SignatureProjectsForm initial={whatWeDo.signatureProjects} />;
}
