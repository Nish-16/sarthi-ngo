import { readContent } from "@/lib/content";
import VisionMissionValuesForm from "@/components/admin/forms/about/VisionMissionValuesForm";

export default async function AboutVmvAdminPage() {
  const { about } = await readContent();
  return <VisionMissionValuesForm initial={about.visionMissionValues} />;
}
