import { readHome } from "@/lib/content";
import WhoWeAreForm from "@/components/admin/forms/WhoWeAreForm";

export default async function WhoWeAreAdminPage() {
  const home = await readHome();
  return <WhoWeAreForm initial={home.whoWeAre} />;
}
