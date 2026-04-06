"use server";

import { revalidatePath } from "next/cache";
import {
  readShared, writeShared, SharedContent,
  readHome, writeHome, HomeContent,
  readAbout, writeAbout,
  readTeam, writeTeam,
  readGetInvolved, writeGetInvolved,
  readWhatWeDo, writeWhatWeDo,
} from "@/lib/content";
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

async function withSaveShared<K extends keyof SharedContent>(
  key: K,
  data: SharedContent[K],
): Promise<ActionResult> {
  try {
    const content = await readShared();
    content[key] = data;
    await writeShared(content);
    // Shared content (navbar/footer) appears on all pages
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save shared.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

async function withSaveHome<K extends keyof HomeContent>(
  key: K,
  data: HomeContent[K],
): Promise<ActionResult> {
  try {
    const content = await readHome();
    content[key] = data;
    await writeHome(content);
    revalidatePath("/", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save home.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

async function withSaveWwd<K extends keyof WwdContent>(
  key: K,
  data: WwdContent[K],
): Promise<ActionResult> {
  try {
    const content = await readWhatWeDo();
    (content as unknown as Record<string, unknown>)[key as string] = data;
    await writeWhatWeDo(content);
    revalidatePath("/what-we-do", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save whatWeDo.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

// local helper type
type WwdContent = {
  hero: WwdHeroContent;
  signatureProjects: WwdSignatureProjectsContent;
  previousProjects: WwdPreviousProjectsContent;
  problem: WwdProblemContent;
  approach: WwdApproachContent;
  impact: WwdImpactContent;
};

async function withSaveAbout<K extends keyof AboutPageContent>(
  key: K,
  data: AboutPageContent[K],
): Promise<ActionResult> {
  try {
    const content = await readAbout();
    content[key] = data;
    await writeAbout(content);
    revalidatePath("/about", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save about.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

async function withSaveGetInvolved<K extends keyof GetInvolvedPageContent>(
  key: K,
  data: GetInvolvedPageContent[K],
): Promise<ActionResult> {
  try {
    const content = await readGetInvolved();
    content[key] = data;
    await writeGetInvolved(content);
    revalidatePath("/get-involved", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save getInvolved.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

async function withSaveTeam<K extends keyof TeamPageContent>(
  key: K,
  data: TeamPageContent[K],
): Promise<ActionResult> {
  try {
    const content = await readTeam();
    content[key] = data;
    await writeTeam(content);
    revalidatePath("/team", "page");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save team.${String(key)}:`, err);
    return { error: "Failed to save. Please try again." };
  }
}

export async function saveMeta(data: MetaContent): Promise<ActionResult> {
  return withSaveShared("meta", data);
}

export async function saveNavbar(data: NavbarContent): Promise<ActionResult> {
  return withSaveShared("navbar", data);
}

export async function saveFooter(data: FooterContent): Promise<ActionResult> {
  return withSaveShared("footer", data);
}

export async function saveHero(data: HeroContent): Promise<ActionResult> {
  return withSaveHome("hero", data);
}

export async function saveWhoWeAre(data: WhoWeAreContent): Promise<ActionResult> {
  return withSaveHome("whoWeAre", data);
}

export async function saveRecognitions(data: RecognitionsContent): Promise<ActionResult> {
  return withSaveHome("recognitions", data);
}

export async function saveFeaturedProjects(data: FeaturedProjectsContent): Promise<ActionResult> {
  return withSaveHome("featuredProjects", data);
}

export async function saveImpactStats(data: ImpactStatsContent): Promise<ActionResult> {
  return withSaveHome("impactStats", data);
}

export async function saveJoinUs(data: JoinUsContent): Promise<ActionResult> {
  return withSaveHome("joinUs", data);
}

export async function saveStoriesUpdates(data: StoriesUpdatesContent): Promise<ActionResult> {
  return withSaveHome("storiesUpdates", data);
}

// ─── What We Do ───────────────────────────────────────────────────────────────

export async function saveWwdHero(data: WwdHeroContent): Promise<ActionResult> {
  return withSaveWwd("hero", data);
}

export async function saveWwdSignatureProjects(data: WwdSignatureProjectsContent): Promise<ActionResult> {
  return withSaveWwd("signatureProjects", data);
}

export async function saveWwdPreviousProjects(data: WwdPreviousProjectsContent): Promise<ActionResult> {
  return withSaveWwd("previousProjects", data);
}

export async function saveWwdProblem(data: WwdProblemContent): Promise<ActionResult> {
  return withSaveWwd("problem", data);
}

export async function saveWwdApproach(data: WwdApproachContent): Promise<ActionResult> {
  return withSaveWwd("approach", data);
}

export async function saveWwdImpact(data: WwdImpactContent): Promise<ActionResult> {
  return withSaveWwd("impact", data);
}

// ─── About ────────────────────────────────────────────────────────────────────

export async function saveAboutHero(data: AboutHeroContent): Promise<ActionResult> {
  return withSaveAbout("hero", data);
}

export async function saveAboutVisionMissionValues(data: AboutVisionMissionValuesContent): Promise<ActionResult> {
  return withSaveAbout("visionMissionValues", data);
}

export async function saveAboutWhyYouth(data: AboutWhyYouthContent): Promise<ActionResult> {
  return withSaveAbout("whyYouth", data);
}

export async function saveAboutRecognition(data: AboutRecognitionContent): Promise<ActionResult> {
  return withSaveAbout("recognition", data);
}

export async function saveAboutSharedLeadership(data: AboutSharedLeadershipContent): Promise<ActionResult> {
  return withSaveAbout("sharedLeadership", data);
}

// ─── Get Involved ─────────────────────────────────────────────────────────────

export async function saveGetInvolvedHero(data: GetInvolvedHeroContent): Promise<ActionResult> {
  return withSaveGetInvolved("hero", data);
}

export async function saveGetInvolvedInvolvementGrid(data: GetInvolvedGridContent): Promise<ActionResult> {
  return withSaveGetInvolved("involvementGrid", data);
}

export async function saveGetInvolvedWhyJoin(data: GetInvolvedWhyJoinContent): Promise<ActionResult> {
  return withSaveGetInvolved("whyJoin", data);
}

export async function saveGetInvolvedTestimonials(data: GetInvolvedTestimonialsContent): Promise<ActionResult> {
  return withSaveGetInvolved("testimonials", data);
}

export async function saveGetInvolvedStats(data: GetInvolvedStatsContent): Promise<ActionResult> {
  return withSaveGetInvolved("stats", data);
}

export async function saveGetInvolvedVolunteer(data: GetInvolvedVolunteerContent): Promise<ActionResult> {
  return withSaveGetInvolved("volunteer", data);
}

export async function saveGetInvolvedIntern(data: GetInvolvedInternContent): Promise<ActionResult> {
  return withSaveGetInvolved("intern", data);
}

export async function saveGetInvolvedCollaborate(data: GetInvolvedCollaborateContent): Promise<ActionResult> {
  return withSaveGetInvolved("collaborate", data);
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function saveTeamHero(data: TeamHeroContent): Promise<ActionResult> {
  return withSaveTeam("hero", data);
}

export async function saveTeamGrid(data: TeamGridContent): Promise<ActionResult> {
  return withSaveTeam("grid", data);
}
