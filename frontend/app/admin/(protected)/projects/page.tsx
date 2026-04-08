import { readHome } from "@/lib/content";
import FeaturedProjectsForm from "@/components/admin/forms/FeaturedProjectsForm";

export default async function ProjectsAdminPage() {
  const home = await readHome();
  return <FeaturedProjectsForm initial={home.featuredProjects} />;
}
