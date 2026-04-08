import { readShared } from "@/lib/content";
import NavbarForm from "@/components/admin/forms/NavbarForm";

export default async function NavbarAdminPage() {
  const shared = await readShared();
  return <NavbarForm initial={shared.navbar} />;
}
