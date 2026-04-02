import { readContent } from "@/lib/content";
import FeaturedProjectsForm from "@/components/admin/forms/FeaturedProjectsForm";

export default function ProjectsAdminPage() {
  const { featuredProjects } = readContent();
  return <FeaturedProjectsForm initial={featuredProjects} />;
}
