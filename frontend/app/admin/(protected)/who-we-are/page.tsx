import { readContent } from "@/lib/content";
import WhoWeAreForm from "@/components/admin/forms/WhoWeAreForm";

export default function WhoWeAreAdminPage() {
  const { whoWeAre } = readContent();
  return <WhoWeAreForm initial={whoWeAre} />;
}
