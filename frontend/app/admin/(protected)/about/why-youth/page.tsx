import { readAbout } from "@/lib/content";
import WhyYouthForm from "@/components/admin/forms/about/WhyYouthForm";

export default async function AboutWhyYouthAdminPage() {
  const about = await readAbout();
  return <WhyYouthForm initial={about.whyYouth} />;
}
