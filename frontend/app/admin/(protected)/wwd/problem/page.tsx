import { readContent } from "@/lib/content";
import ProblemForm from "@/components/admin/forms/what-we-do/ProblemForm";

export default function WwdProblemAdminPage() {
  const { whatWeDo } = readContent();
  return <ProblemForm initial={whatWeDo.problem} />;
}
