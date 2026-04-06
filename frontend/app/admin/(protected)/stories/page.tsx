import { readContent } from "@/lib/content";
import StoriesUpdatesForm from "@/components/admin/forms/StoriesUpdatesForm";

export default async function StoriesAdminPage() {
  const { storiesUpdates } = await readContent();
  return <StoriesUpdatesForm initial={storiesUpdates} />;
}
