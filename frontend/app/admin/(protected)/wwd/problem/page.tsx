import { readContent } from "@/lib/content";
import ProblemForm from "@/components/admin/forms/what-we-do/ProblemForm";

export default async function WwdProblemAdminPage() {
  const { whatWeDo } = await readContent();
  return <ProblemForm initial={whatWeDo.problem} />;
}
