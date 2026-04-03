import { readContent } from "@/lib/content";
import WhyYouthForm from "@/components/admin/forms/about/WhyYouthForm";

export default function AboutWhyYouthAdminPage() {
  const { about } = readContent();
  return <WhyYouthForm initial={about.whyYouth} />;
}
