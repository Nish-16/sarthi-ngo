import { readContent } from "@/lib/content";
import FooterForm from "@/components/admin/forms/FooterForm";

export default function FooterAdminPage() {
  const { footer } = readContent();
  return <FooterForm initial={footer} />;
}
