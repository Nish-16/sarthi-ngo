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

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  headlineEnd: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
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

// ─── What We Do Page ──────────────────────────────────────────────────────────

export interface WwdHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
}

export interface WwdInitiativeItem {
  name: string;
  tagline: string;
  description: string;
  image: string;
  clipPath: string;
  accent: string;
  iconName: string;
  problem?: string;
  whatWeDo?: string;
  ourWork?: string;
}

export interface WwdSignatureProjectsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheading: string;
  initiatives: WwdInitiativeItem[];
}

export interface WwdPreviousProjectItem {
  title: string;
  description: string;
  image: string;
  iconName: string;
  accent: string;
  tag: string;
  problem?: string;
  whatWeDo?: string;
  ourWork?: string;
}

export interface WwdPreviousProjectsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  projects: WwdPreviousProjectItem[];
}

export interface WwdGapItem {
  iconName: string;
  label: string;
  color: string;
}

export interface WwdProblemContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description1: string;
  description2: string;
  image: string;
  imageAlt: string;
  statValue: string;
  statLabel: string;
  gaps: WwdGapItem[];
}

export interface WwdApproachStep {
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface WwdApproachContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  image: string;
  imageAlt: string;
  quoteCard: string;
  steps: WwdApproachStep[];
  images?: { src: string; alt: string }[];
}

export interface WwdImpactStatItem {
  value: string;
  label: string;
  iconName: string;
}

export interface WwdImpactContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  stats: WwdImpactStatItem[];
}

export interface WhatWeDoContent {
  hero: WwdHeroContent;
  signatureProjects: WwdSignatureProjectsContent;
  previousProjects: WwdPreviousProjectsContent;
  problem: WwdProblemContent;
  approach: WwdApproachContent;
  impact: WwdImpactContent;
}

// ─── Get Involved Page ───────────────────────────────────────────────────────

export interface GetInvolvedHeroImage {
  src: string;
  alt: string;
  clipPath: string;
}

export interface GetInvolvedHeroStat {
  value: string;
  label: string;
}

export interface GetInvolvedHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  openRolesLabel: string;
  openRolesValue: string;
  communitiesLabel: string;
  communitiesValue: string;
  stats: GetInvolvedHeroStat[];
  images: GetInvolvedHeroImage[];
}

export type GetInvolvedButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

export interface GetInvolvedGridFeatured {
  iconName: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  badge: string;
}

export interface GetInvolvedGridCard {
  iconName: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  iconBg: string;
  ctaVariant: GetInvolvedButtonVariant;
}

export interface GetInvolvedGridInvite {
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface GetInvolvedGridContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  featured: GetInvolvedGridFeatured;
  cards: GetInvolvedGridCard[];
  invite: GetInvolvedGridInvite;
}

export interface GetInvolvedWhyJoinBenefit {
  iconName: string;
  title: string;
  description: string;
  color: string;
}

export interface GetInvolvedWhyJoinContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  satisfactionLabel: string;
  satisfactionValue: string;
  benefits: GetInvolvedWhyJoinBenefit[];
}

export interface GetInvolvedTestimonialItem {
  quote: string;
  name: string;
  role: string;
  image: string;
  accent: string;
  tag: string;
}

export interface GetInvolvedTestimonialsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  items: GetInvolvedTestimonialItem[];
}

export interface GetInvolvedStatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
  gradient: string;
  iconColor: string;
}

export interface GetInvolvedStatsContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  items: GetInvolvedStatItem[];
}

export interface GetInvolvedVolunteerContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  openSpotsLabel: string;
  openSpotsValue: string;
  intakeLabel: string;
  intakeValue: string;
}

export interface GetInvolvedOpportunityItem {
  iconName: string;
  title: string;
  description: string;
  color: string;
}

export interface GetInvolvedInternContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  opportunities: GetInvolvedOpportunityItem[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  durationLabel: string;
  durationValue: string;
  trainedLabel: string;
  trainedValue: string;
}

export interface GetInvolvedCollaborateContent {
  eyebrow: string;
  headline: string;
  tagline: string;
  paragraphs: string[];
  closingText: string;
  collaboratorTypes: string[];
  contributionModes: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface GetInvolvedInviteFoundersContent {
  eyebrow: string;
  headline: string;
  quote: string;
  subheadline: string;
  paragraphs: string[];
  keywords: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface GetInvolvedPageContent {
  hero: GetInvolvedHeroContent;
  involvementGrid: GetInvolvedGridContent;
  whyJoin: GetInvolvedWhyJoinContent;
  testimonials: GetInvolvedTestimonialsContent;
  stats: GetInvolvedStatsContent;
  volunteer: GetInvolvedVolunteerContent;
  intern: GetInvolvedInternContent;
  collaborate: GetInvolvedCollaborateContent;
  inviteFounders: GetInvolvedInviteFoundersContent;
}

// ─── About Page ───────────────────────────────────────────────────────────────

export interface AboutHeroImage {
  src: string;
  alt: string;
  clipPath: string;
}

export interface AboutHeroStat {
  value: string;
  label: string;
}

export interface AboutHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  topCardLabel: string;
  topCardValue: string;
  bottomCardLabel: string;
  bottomCardValue: string;
  stats: AboutHeroStat[];
  images: AboutHeroImage[];
}

export interface AboutPillarItem {
  title: string;
  iconName: string;
  description: string;
  accent: string;
  bg: string;
  iconBg: string;
  tag: string;
}

export interface AboutVisionMissionValuesContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  pillars: AboutPillarItem[];
}

export interface AboutWhyYouthReason {
  iconName: string;
  label: string;
  color: string;
}

export interface AboutWhyYouthContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description1: string;
  description2: string;
  image: string;
  imageAlt: string;
  statLabel: string;
  statValue: string;
  reasons: AboutWhyYouthReason[];
}

export interface AboutRecognitionBlock {
  title: string;
  iconName: string;
  accent: string;
  iconColor: string;
  details: string[];
}

export interface AboutRecognitionContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  blocks: AboutRecognitionBlock[];
  partnerEyebrow: string;
  partnerLogos: string[];
}

export interface AboutSharedLeadershipPrinciple {
  iconName: string;
  label: string;
  color: string;
}

export interface AboutSharedLeadershipContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  cta: string;
  ctaHref: string;
  principles: AboutSharedLeadershipPrinciple[];
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  visionMissionValues: AboutVisionMissionValuesContent;
  whyYouth: AboutWhyYouthContent;
  recognition: AboutRecognitionContent;
  sharedLeadership: AboutSharedLeadershipContent;
}

// ─── Team Page ────────────────────────────────────────────────────────────────

export interface TeamStatItem {
  value: string;
  label: string;
  iconName: string;
}

export interface TeamHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  stats: TeamStatItem[];
}

export interface TeamMemberContent {
  name: string;
  role: string;
  department: string;
  image: string;
  linkedin: string;
  email: string;
  accentColor: string;
}

export interface TeamGroupContent {
  title: string;
  subtitle: string;
  members: TeamMemberContent[];
}

export interface TeamGridContent {
  groups: TeamGroupContent[];
}

export interface TeamPageContent {
  hero: TeamHeroContent;
  grid: TeamGridContent;
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
  whatWeDo: WhatWeDoContent;
  about: AboutPageContent;
  getInvolved: GetInvolvedPageContent;
  team: TeamPageContent;
}
