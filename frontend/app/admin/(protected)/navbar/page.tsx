import { readContent } from "@/lib/content";
import NavbarForm from "@/components/admin/forms/NavbarForm";

export default function NavbarAdminPage() {
  const { navbar } = readContent();
  return <NavbarForm initial={navbar} />;
}
