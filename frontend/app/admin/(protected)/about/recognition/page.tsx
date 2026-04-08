import { readAbout } from "@/lib/content";
import RecognitionForm from "@/components/admin/forms/about/RecognitionForm";

export default async function AboutRecognitionAdminPage() {
  const about = await readAbout();
  return <RecognitionForm initial={about.recognition} />;
}
