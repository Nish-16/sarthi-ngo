import { readHome } from "@/lib/content";
import StoriesUpdatesForm from "@/components/admin/forms/StoriesUpdatesForm";

export default async function StoriesAdminPage() {
  const home = await readHome();
  return <StoriesUpdatesForm initial={home.storiesUpdates} />;
}
