import { readContent } from "@/lib/content";
import WhoWeAreForm from "@/components/admin/forms/WhoWeAreForm";

export default async function WhoWeAreAdminPage() {
  const { whoWeAre } = await readContent();
  return <WhoWeAreForm initial={whoWeAre} />;
}
