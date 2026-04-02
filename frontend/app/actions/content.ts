"use server";

import { revalidatePath } from "next/cache";
import { readContent, writeContent } from "@/lib/content";
import type {
  HeroContent,
  WhoWeAreContent,
  RecognitionsContent,
  FeaturedProjectsContent,
  ImpactStatsContent,
  JoinUsContent,
  StoriesUpdatesContent,
  NavbarContent,
  FooterContent,
  MetaContent,
} from "@/types/content";

type ActionResult = { success: true } | { error: string };

function withSave<T>(
  key: keyof ReturnType<typeof readContent>,
  data: T
): ActionResult {
  try {
    const content = readContent();
    (content as unknown as Record<string, unknown>)[key] = data;
    writeContent(content);
    revalidatePath("/", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save ${key}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

export async function saveMeta(data: MetaContent): Promise<ActionResult> {
  return withSave("meta", data);
}

export async function saveNavbar(data: NavbarContent): Promise<ActionResult> {
  return withSave("navbar", data);
}

export async function saveHero(data: HeroContent): Promise<ActionResult> {
  return withSave("hero", data);
}

export async function saveWhoWeAre(
  data: WhoWeAreContent
): Promise<ActionResult> {
  return withSave("whoWeAre", data);
}

export async function saveRecognitions(
  data: RecognitionsContent
): Promise<ActionResult> {
  return withSave("recognitions", data);
}

export async function saveFeaturedProjects(
  data: FeaturedProjectsContent
): Promise<ActionResult> {
  return withSave("featuredProjects", data);
}

export async function saveImpactStats(
  data: ImpactStatsContent
): Promise<ActionResult> {
  return withSave("impactStats", data);
}

export async function saveJoinUs(data: JoinUsContent): Promise<ActionResult> {
  return withSave("joinUs", data);
}

export async function saveStoriesUpdates(
  data: StoriesUpdatesContent
): Promise<ActionResult> {
  return withSave("storiesUpdates", data);
}

export async function saveFooter(data: FooterContent): Promise<ActionResult> {
  return withSave("footer", data);
}
