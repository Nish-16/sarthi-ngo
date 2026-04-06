import { readContent } from "@/lib/content";
import FooterForm from "@/components/admin/forms/FooterForm";

export default async function FooterAdminPage() {
  const { footer } = await readContent();
  return <FooterForm initial={footer} />;
}
