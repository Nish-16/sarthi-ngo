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
  WhatWeDoContent,
  WwdHeroContent,
  WwdSignatureProjectsContent,
  WwdPreviousProjectsContent,
  WwdProblemContent,
  WwdApproachContent,
  WwdImpactContent,
  AboutPageContent,
  AboutHeroContent,
  AboutVisionMissionValuesContent,
  AboutWhyYouthContent,
  AboutRecognitionContent,
  AboutSharedLeadershipContent,
  GetInvolvedPageContent,
  GetInvolvedHeroContent,
  GetInvolvedGridContent,
  GetInvolvedWhyJoinContent,
  GetInvolvedTestimonialsContent,
  GetInvolvedStatsContent,
  GetInvolvedVolunteerContent,
  GetInvolvedInternContent,
  GetInvolvedCollaborateContent,
  TeamPageContent,
  TeamHeroContent,
  TeamGridContent,
} from "@/types/content";

type ActionResult = { success: true } | { error: string };

function withSave<T>(
  key: keyof ReturnType<typeof readContent>,
  data: T,
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

function withSaveWwd<K extends keyof WhatWeDoContent>(
  key: K,
  data: WhatWeDoContent[K],
): ActionResult {
  try {
    const content = readContent();
    content.whatWeDo[key] = data;
    writeContent(content);
    revalidatePath("/what-we-do", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save whatWeDo.${key}:`, err);
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
  data: WhoWeAreContent,
): Promise<ActionResult> {
  return withSave("whoWeAre", data);
}

export async function saveRecognitions(
  data: RecognitionsContent,
): Promise<ActionResult> {
  return withSave("recognitions", data);
}

export async function saveFeaturedProjects(
  data: FeaturedProjectsContent,
): Promise<ActionResult> {
  return withSave("featuredProjects", data);
}

export async function saveImpactStats(
  data: ImpactStatsContent,
): Promise<ActionResult> {
  return withSave("impactStats", data);
}

export async function saveJoinUs(data: JoinUsContent): Promise<ActionResult> {
  return withSave("joinUs", data);
}

export async function saveStoriesUpdates(
  data: StoriesUpdatesContent,
): Promise<ActionResult> {
  return withSave("storiesUpdates", data);
}

export async function saveFooter(data: FooterContent): Promise<ActionResult> {
  return withSave("footer", data);
}

// ─── What We Do ───────────────────────────────────────────────────────────────

export async function saveWwdHero(data: WwdHeroContent): Promise<ActionResult> {
  return withSaveWwd("hero", data);
}

export async function saveWwdSignatureProjects(
  data: WwdSignatureProjectsContent,
): Promise<ActionResult> {
  return withSaveWwd("signatureProjects", data);
}

export async function saveWwdPreviousProjects(
  data: WwdPreviousProjectsContent,
): Promise<ActionResult> {
  return withSaveWwd("previousProjects", data);
}

export async function saveWwdProblem(
  data: WwdProblemContent,
): Promise<ActionResult> {
  return withSaveWwd("problem", data);
}

export async function saveWwdApproach(
  data: WwdApproachContent,
): Promise<ActionResult> {
  return withSaveWwd("approach", data);
}

export async function saveWwdImpact(
  data: WwdImpactContent,
): Promise<ActionResult> {
  return withSaveWwd("impact", data);
}

// ─── About ───────────────────────────────────────────────────────────────────

function withSaveAbout<K extends keyof AboutPageContent>(
  key: K,
  data: AboutPageContent[K],
): ActionResult {
  try {
    const content = readContent();
    content.about[key] = data;
    writeContent(content);
    revalidatePath("/about", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save about.${key}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

export async function saveAboutHero(
  data: AboutHeroContent,
): Promise<ActionResult> {
  return withSaveAbout("hero", data);
}

export async function saveAboutVisionMissionValues(
  data: AboutVisionMissionValuesContent,
): Promise<ActionResult> {
  return withSaveAbout("visionMissionValues", data);
}

export async function saveAboutWhyYouth(
  data: AboutWhyYouthContent,
): Promise<ActionResult> {
  return withSaveAbout("whyYouth", data);
}

export async function saveAboutRecognition(
  data: AboutRecognitionContent,
): Promise<ActionResult> {
  return withSaveAbout("recognition", data);
}

export async function saveAboutSharedLeadership(
  data: AboutSharedLeadershipContent,
): Promise<ActionResult> {
  return withSaveAbout("sharedLeadership", data);
}

// ─── Get Involved ────────────────────────────────────────────────────────────

function withSaveGetInvolved<K extends keyof GetInvolvedPageContent>(
  key: K,
  data: GetInvolvedPageContent[K],
): ActionResult {
  try {
    const content = readContent();
    content.getInvolved[key] = data;
    writeContent(content);
    revalidatePath("/get-involved", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save getInvolved.${key}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

export async function saveGetInvolvedHero(
  data: GetInvolvedHeroContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("hero", data);
}

export async function saveGetInvolvedInvolvementGrid(
  data: GetInvolvedGridContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("involvementGrid", data);
}

export async function saveGetInvolvedWhyJoin(
  data: GetInvolvedWhyJoinContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("whyJoin", data);
}

export async function saveGetInvolvedTestimonials(
  data: GetInvolvedTestimonialsContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("testimonials", data);
}

export async function saveGetInvolvedStats(
  data: GetInvolvedStatsContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("stats", data);
}

export async function saveGetInvolvedVolunteer(
  data: GetInvolvedVolunteerContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("volunteer", data);
}

export async function saveGetInvolvedIntern(
  data: GetInvolvedInternContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("intern", data);
}

export async function saveGetInvolvedCollaborate(
  data: GetInvolvedCollaborateContent,
): Promise<ActionResult> {
  return withSaveGetInvolved("collaborate", data);
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function withSaveTeam<K extends keyof TeamPageContent>(
  key: K,
  data: TeamPageContent[K],
): ActionResult {
  try {
    const content = readContent();
    content.team[key] = data;
    writeContent(content);
    revalidatePath("/team", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save team.${key}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

export async function saveTeamHero(
  data: TeamHeroContent,
): Promise<ActionResult> {
  return withSaveTeam("hero", data);
}

export async function saveTeamGrid(
  data: TeamGridContent,
): Promise<ActionResult> {
  return withSaveTeam("grid", data);
}
