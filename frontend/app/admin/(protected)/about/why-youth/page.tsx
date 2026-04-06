import { readContent } from "@/lib/content";
import WhyYouthForm from "@/components/admin/forms/about/WhyYouthForm";

export default async function AboutWhyYouthAdminPage() {
  const { about } = await readContent();
  return <WhyYouthForm initial={about.whyYouth} />;
}
