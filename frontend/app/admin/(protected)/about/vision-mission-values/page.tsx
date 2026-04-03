import { readContent } from "@/lib/content";
import VisionMissionValuesForm from "@/components/admin/forms/about/VisionMissionValuesForm";

export default function AboutVmvAdminPage() {
  const { about } = readContent();
  return <VisionMissionValuesForm initial={about.visionMissionValues} />;
}
