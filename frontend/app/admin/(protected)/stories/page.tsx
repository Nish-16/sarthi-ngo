import { readContent } from "@/lib/content";
import StoriesUpdatesForm from "@/components/admin/forms/StoriesUpdatesForm";

export default function StoriesAdminPage() {
  const { storiesUpdates } = readContent();
  return <StoriesUpdatesForm initial={storiesUpdates} />;
}
