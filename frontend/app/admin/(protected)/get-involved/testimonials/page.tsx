import { readContent } from "@/lib/content";
import TestimonialsForm from "@/components/admin/forms/get-involved/TestimonialsForm";

export default function GetInvolvedTestimonialsAdminPage() {
  const { getInvolved } = readContent();
  return <TestimonialsForm initial={getInvolved.testimonials} />;
}
