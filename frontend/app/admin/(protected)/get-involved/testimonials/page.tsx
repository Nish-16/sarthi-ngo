import { readContent } from "@/lib/content";
import TestimonialsForm from "@/components/admin/forms/get-involved/TestimonialsForm";

export default async function GetInvolvedTestimonialsAdminPage() {
  const { getInvolved } = await readContent();
  return <TestimonialsForm initial={getInvolved.testimonials} />;
}
