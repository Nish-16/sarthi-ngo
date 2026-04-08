import { readAbout } from "@/lib/content";
import VisionMissionValuesForm from "@/components/admin/forms/about/VisionMissionValuesForm";

export default async function AboutVmvAdminPage() {
  const about = await readAbout();
  return <VisionMissionValuesForm initial={about.visionMissionValues} />;
}
