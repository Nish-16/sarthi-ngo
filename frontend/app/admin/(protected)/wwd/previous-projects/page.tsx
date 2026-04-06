import { readContent } from "@/lib/content";
import PreviousProjectsForm from "@/components/admin/forms/what-we-do/PreviousProjectsForm";

export default async function WwdPreviousProjectsAdminPage() {
  const { whatWeDo } = await readContent();
  return <PreviousProjectsForm initial={whatWeDo.previousProjects} />;
}
