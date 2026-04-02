// ─── Meta ────────────────────────────────────────────────────────────────────

export interface MetaContent {
  title: string;
  description: string;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  logoText: string;
  ctaLabel: string;
  ctaHref: string;
  links: NavLink[];
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
  clipPath: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  headlineEnd: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  memberCount: string;
  memberSubtext: string;
  memberCities: string;
  impactScore: string;
  awardLabel: string;
  images: HeroImage[];
  memberAvatars: string[];
}

// ─── Who We Are ───────────────────────────────────────────────────────────────

export interface WhoWeAreContent {
  eyebrow: string;
  yearsLabel: string;
  yearsValue: string;
  headline: string;
  headlineAccent: string;
  description1: string;
  description2: string;
  values: string[];
  ctaLabel: string;
  mainImage: string;
  mainImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
}

// ─── Recognitions ─────────────────────────────────────────────────────────────

export interface OrgItem {
  name: string;
  abbr: string;
}

export interface AwardItem {
  icon: string;
  title: string;
  year: string;
}

export interface RecognitionsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  organizations: OrgItem[];
  awards: AwardItem[];
}

// ─── Featured Projects ────────────────────────────────────────────────────────

export interface ProjectItem {
  image: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  stat: string;
  clipPath: string;
}

export interface FeaturedProjectsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  ctaLabel: string;
  projects: ProjectItem[];
}

// ─── Impact Stats ─────────────────────────────────────────────────────────────

export interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface ImpactStatsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  footnote: string;
  stats: StatItem[];
}

// ─── Join Us ──────────────────────────────────────────────────────────────────

export interface JoinUsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  badges: string[];
}

// ─── Stories & Updates ────────────────────────────────────────────────────────

export type StorySize = "tall" | "normal" | "wide";

export interface StoryItem {
  image: string;
  size: StorySize;
  category: string;
  title: string;
}

export interface StoriesUpdatesContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  ctaLabel: string;
  items: StoryItem[];
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  category: string;
  links: FooterLinkItem[];
}

export interface FooterContent {
  logoText: string;
  tagline: string;
  copyright: string;
  linkGroups: FooterLinkGroup[];
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface PageContent {
  meta: MetaContent;
  navbar: NavbarContent;
  hero: HeroContent;
  whoWeAre: WhoWeAreContent;
  recognitions: RecognitionsContent;
  featuredProjects: FeaturedProjectsContent;
  impactStats: ImpactStatsContent;
  joinUs: JoinUsContent;
  storiesUpdates: StoriesUpdatesContent;
  footer: FooterContent;
}
