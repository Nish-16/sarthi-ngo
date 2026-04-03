import { readContent } from "@/lib/content";
import RecognitionForm from "@/components/admin/forms/about/RecognitionForm";

export default function AboutRecognitionAdminPage() {
  const { about } = readContent();
  return <RecognitionForm initial={about.recognition} />;
}
