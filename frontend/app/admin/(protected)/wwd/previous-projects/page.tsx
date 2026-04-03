import { readContent } from "@/lib/content";
import PreviousProjectsForm from "@/components/admin/forms/what-we-do/PreviousProjectsForm";

export default function WwdPreviousProjectsAdminPage() {
  const { whatWeDo } = readContent();
  return <PreviousProjectsForm initial={whatWeDo.previousProjects} />;
}
