import { getAdminDb } from "./firebase-admin";
import type {
  PageContent,
  NavbarContent,
  FooterContent,
  MetaContent,
  HeroContent,
  WhoWeAreContent,
  RecognitionsContent,
  FeaturedProjectsContent,
  ImpactStatsContent,
  JoinUsContent,
  StoriesUpdatesContent,
  AboutPageContent,
  TeamPageContent,
  GetInvolvedPageContent,
  WhatWeDoContent,
} from "@/types/content";

const COLLECTION = process.env.FIREBASE_COLLECTION ?? process.env.NEXT_PUBLIC_FIREBASE_COLLECTION ?? "dev_content";

const DOC_SHARED = "shared";
const DOC_HOME = "home";
const DOC_ABOUT = "about";
const DOC_TEAM = "team";
const DOC_GET_INVOLVED = "get-involved";
const DOC_WHAT_WE_DO = "what-we-do";
const DOC_LEGACY = "page";

export type SharedContent = {
  navbar: NavbarContent;
  footer: FooterContent;
  meta: MetaContent;
};

export type HomeContent = {
  hero: HeroContent;
  whoWeAre: WhoWeAreContent;
  recognitions: RecognitionsContent;
  featuredProjects: FeaturedProjectsContent;
  impactStats: ImpactStatsContent;
  joinUs: JoinUsContent;
  storiesUpdates: StoriesUpdatesContent;
};

async function readDoc<T>(docId: string): Promise<T | null> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(docId).get();
  if (!snap.exists) return null;
  return snap.data() as T;
}

async function writeDoc<T extends object>(docId: string, data: T): Promise<void> {
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(docId).set(data);
}

async function legacyFallback(): Promise<PageContent> {
  const legacy = await readDoc<PageContent>(DOC_LEGACY);
  if (!legacy) throw new Error(`Content not found in collection "${COLLECTION}"`);
  return legacy;
}

// ─── Shared (navbar, footer, meta) ───────────────────────────────────────────

export async function readShared(): Promise<SharedContent> {
  const data = await readDoc<SharedContent>(DOC_SHARED);
  if (data) return data;
  const legacy = await legacyFallback();
  return { navbar: legacy.navbar, footer: legacy.footer, meta: legacy.meta };
}

export async function writeShared(data: SharedContent): Promise<void> {
  await writeDoc(DOC_SHARED, data);
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export async function readHome(): Promise<HomeContent> {
  const data = await readDoc<HomeContent>(DOC_HOME);
  if (data) return data;
  const legacy = await legacyFallback();
  return {
    hero: legacy.hero,
    whoWeAre: legacy.whoWeAre,
    recognitions: legacy.recognitions,
    featuredProjects: legacy.featuredProjects,
    impactStats: legacy.impactStats,
    joinUs: legacy.joinUs,
    storiesUpdates: legacy.storiesUpdates,
  };
}

export async function writeHome(data: HomeContent): Promise<void> {
  await writeDoc(DOC_HOME, data);
}

// ─── About ────────────────────────────────────────────────────────────────────

export async function readAbout(): Promise<AboutPageContent> {
  const data = await readDoc<AboutPageContent>(DOC_ABOUT);
  if (data) return data;
  const legacy = await legacyFallback();
  return legacy.about;
}

export async function writeAbout(data: AboutPageContent): Promise<void> {
  await writeDoc(DOC_ABOUT, data);
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function readTeam(): Promise<TeamPageContent> {
  const data = await readDoc<TeamPageContent>(DOC_TEAM);
  if (data) return data;
  const legacy = await legacyFallback();
  return legacy.team;
}

export async function writeTeam(data: TeamPageContent): Promise<void> {
  await writeDoc(DOC_TEAM, data);
}

// ─── Get Involved ─────────────────────────────────────────────────────────────

export async function readGetInvolved(): Promise<GetInvolvedPageContent> {
  const data = await readDoc<GetInvolvedPageContent>(DOC_GET_INVOLVED);
  if (data) return data;
  const legacy = await legacyFallback();
  return legacy.getInvolved;
}

export async function writeGetInvolved(data: GetInvolvedPageContent): Promise<void> {
  await writeDoc(DOC_GET_INVOLVED, data);
}

// ─── What We Do ───────────────────────────────────────────────────────────────

export async function readWhatWeDo(): Promise<WhatWeDoContent> {
  const data = await readDoc<WhatWeDoContent>(DOC_WHAT_WE_DO);
  if (data) return data;
  const legacy = await legacyFallback();
  return legacy.whatWeDo;
}

export async function writeWhatWeDo(data: WhatWeDoContent): Promise<void> {
  await writeDoc(DOC_WHAT_WE_DO, data);
}

// ─── Legacy (kept for any remaining admin uses) ───────────────────────────────

export async function readContent(): Promise<PageContent> {
  return legacyFallback();
}

export async function writeContent(content: PageContent): Promise<void> {
  await writeDoc(DOC_LEGACY, content);
}
