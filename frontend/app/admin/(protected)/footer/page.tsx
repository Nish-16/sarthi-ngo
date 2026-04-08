import { readShared } from "@/lib/content";
import FooterForm from "@/components/admin/forms/FooterForm";

export default async function FooterAdminPage() {
  const shared = await readShared();
  return <FooterForm initial={shared.footer} />;
}
