import { readWhatWeDo } from "@/lib/content";
import ProblemForm from "@/components/admin/forms/what-we-do/ProblemForm";

export default async function WwdProblemAdminPage() {
  const whatWeDo = await readWhatWeDo();
  return <ProblemForm initial={whatWeDo.problem} />;
}
