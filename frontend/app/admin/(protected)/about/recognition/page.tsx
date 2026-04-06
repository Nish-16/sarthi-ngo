import { readContent } from "@/lib/content";
import RecognitionForm from "@/components/admin/forms/about/RecognitionForm";

export default async function AboutRecognitionAdminPage() {
  const { about } = await readContent();
  return <RecognitionForm initial={about.recognition} />;
}
