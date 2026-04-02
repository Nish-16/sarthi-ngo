import fs from "fs";
import path from "path";
import type { PageContent } from "@/types/content";

const CONTENT_PATH = path.join(process.cwd(), "content", "page-content.json");

export function readContent(): PageContent {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as PageContent;
}

export function writeContent(content: PageContent): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}
