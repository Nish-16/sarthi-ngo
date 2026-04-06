import { readContent } from "@/lib/content";
import NavbarForm from "@/components/admin/forms/NavbarForm";

export default async function NavbarAdminPage() {
  const { navbar } = await readContent();
  return <NavbarForm initial={navbar} />;
}
