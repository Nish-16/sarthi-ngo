import { readContent } from "@/lib/content";
import FeaturedProjectsForm from "@/components/admin/forms/FeaturedProjectsForm";

export default async function ProjectsAdminPage() {
  const { featuredProjects } = await readContent();
  return <FeaturedProjectsForm initial={featuredProjects} />;
}
