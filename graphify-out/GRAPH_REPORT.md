# Graph Report - .  (2026-04-18)

## Corpus Check
- 145 files · ~52,280 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 396 nodes · 421 edges · 92 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.8)
- Token cost: 2,800 input · 1,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Write Actions|Admin Write Actions]]
- [[_COMMUNITY_Content Read & Firestore|Content Read & Firestore]]
- [[_COMMUNITY_Project Docs & Design System|Project Docs & Design System]]
- [[_COMMUNITY_Auth & Image Upload|Auth & Image Upload]]
- [[_COMMUNITY_Get Involved Pages|Get Involved Pages]]
- [[_COMMUNITY_What We Do Pages|What We Do Pages]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Token & Auth Utilities|Token & Auth Utilities]]
- [[_COMMUNITY_Hero Admin Forms|Hero Admin Forms]]
- [[_COMMUNITY_Color Utils & Team UI|Color Utils & Team UI]]
- [[_COMMUNITY_Array Field Editor|Array Field Editor]]
- [[_COMMUNITY_Problem Section Admin|Problem Section Admin]]
- [[_COMMUNITY_Featured Projects Admin|Featured Projects Admin]]
- [[_COMMUNITY_Impact Stats Admin|Impact Stats Admin]]
- [[_COMMUNITY_Recognitions Admin|Recognitions Admin]]
- [[_COMMUNITY_Stories Updates Admin|Stories Updates Admin]]
- [[_COMMUNITY_Who We Are Admin|Who We Are Admin]]
- [[_COMMUNITY_Recognition Admin|Recognition Admin]]
- [[_COMMUNITY_Shared Leadership Admin|Shared Leadership Admin]]
- [[_COMMUNITY_Vision Mission Admin|Vision Mission Admin]]
- [[_COMMUNITY_Why Youth Admin|Why Youth Admin]]
- [[_COMMUNITY_Stats Admin Form|Stats Admin Form]]
- [[_COMMUNITY_Testimonials Admin|Testimonials Admin]]
- [[_COMMUNITY_Why Join Admin|Why Join Admin]]
- [[_COMMUNITY_Team Grid Admin|Team Grid Admin]]
- [[_COMMUNITY_Approach Admin Form|Approach Admin Form]]
- [[_COMMUNITY_Impact Admin Form|Impact Admin Form]]
- [[_COMMUNITY_Previous Projects Admin|Previous Projects Admin]]
- [[_COMMUNITY_Recognition Display|Recognition Display]]
- [[_COMMUNITY_Footer Admin Form|Footer Admin Form]]
- [[_COMMUNITY_Join Us Admin|Join Us Admin]]
- [[_COMMUNITY_Navbar Admin|Navbar Admin]]
- [[_COMMUNITY_Collaborate Admin|Collaborate Admin]]
- [[_COMMUNITY_Intern Admin Form|Intern Admin Form]]
- [[_COMMUNITY_Invite Founders Admin|Invite Founders Admin]]
- [[_COMMUNITY_Volunteer Admin|Volunteer Admin]]
- [[_COMMUNITY_Problem Section Display|Problem Section Display]]
- [[_COMMUNITY_Photo Carousel|Photo Carousel]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Admin Dashboard|Admin Dashboard]]
- [[_COMMUNITY_About Admin Page|About Admin Page]]
- [[_COMMUNITY_Get Involved Admin Page|Get Involved Admin Page]]
- [[_COMMUNITY_Team Admin Page|Team Admin Page]]
- [[_COMMUNITY_Smooth Scroll Provider|Smooth Scroll Provider]]
- [[_COMMUNITY_Admin Scroll|Admin Scroll]]
- [[_COMMUNITY_Image Upload UI|Image Upload UI]]
- [[_COMMUNITY_Section Shell|Section Shell]]
- [[_COMMUNITY_Admin Sidebar|Admin Sidebar]]
- [[_COMMUNITY_Involvement Grid Admin|Involvement Grid Admin]]
- [[_COMMUNITY_Site Footer|Site Footer]]
- [[_COMMUNITY_Who We Are Section|Who We Are Section]]
- [[_COMMUNITY_Collaborate Section|Collaborate Section]]
- [[_COMMUNITY_Invite Founders Section|Invite Founders Section]]
- [[_COMMUNITY_Involvement Grid|Involvement Grid]]
- [[_COMMUNITY_Volunteer Section|Volunteer Section]]
- [[_COMMUNITY_Previous Projects|Previous Projects]]
- [[_COMMUNITY_Projects Section|Projects Section]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Card Component|Card Component]]
- [[_COMMUNITY_Social Icons|Social Icons]]
- [[_COMMUNITY_DB Seed Script|DB Seed Script]]
- [[_COMMUNITY_Dev Sync Script|Dev Sync Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Env Types|Next.js Env Types]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Standalone Page|Standalone Page]]
- [[_COMMUNITY_Standalone Page|Standalone Page]]
- [[_COMMUNITY_Standalone Page|Standalone Page]]
- [[_COMMUNITY_Form Group Component|Form Group Component]]
- [[_COMMUNITY_Navbar Component|Navbar Component]]
- [[_COMMUNITY_Featured Projects Section|Featured Projects Section]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Impact Stats Section|Impact Stats Section]]
- [[_COMMUNITY_Join Us Section|Join Us Section]]
- [[_COMMUNITY_Recognitions Section|Recognitions Section]]
- [[_COMMUNITY_Stories Updates Section|Stories Updates Section]]
- [[_COMMUNITY_About Hero Section|About Hero Section]]
- [[_COMMUNITY_Shared Leadership Block|Shared Leadership Block]]
- [[_COMMUNITY_Vision Mission Values|Vision Mission Values]]
- [[_COMMUNITY_Why Youth Section|Why Youth Section]]
- [[_COMMUNITY_Intern Section|Intern Section]]
- [[_COMMUNITY_Involvement Stats|Involvement Stats]]
- [[_COMMUNITY_Testimonials Section|Testimonials Section]]
- [[_COMMUNITY_Why Join Section|Why Join Section]]
- [[_COMMUNITY_Team Grid Section|Team Grid Section]]
- [[_COMMUNITY_Approach Section|Approach Section]]
- [[_COMMUNITY_Impact Section|Impact Section]]
- [[_COMMUNITY_Container Component|Container Component]]
- [[_COMMUNITY_Firebase Client|Firebase Client]]
- [[_COMMUNITY_Firestore Seed Script|Firestore Seed Script]]
- [[_COMMUNITY_Content Types|Content Types]]

## God Nodes (most connected - your core abstractions)
1. `withSaveGetInvolved()` - 14 edges
2. `withSaveHome()` - 12 edges
3. `readGetInvolved()` - 12 edges
4. `withSaveWwd()` - 11 edges
5. `readHome()` - 11 edges
6. `withSaveAbout()` - 10 edges
7. `readWhatWeDo()` - 10 edges
8. `requireAdminSession()` - 9 edges
9. `readAbout()` - 9 edges
10. `Sarthi NGO Website Project` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Yuva Sarthi Logo` --references--> `Sarthi NGO Website Project`  [EXTRACTED]
  frontend/public/sarthi-logo.png → README.md
- `HMAC Token Cookie Authentication` --semantically_similar_to--> `Auth System Hardening (token versioning, Firestore-backed)`  [INFERRED] [semantically similar]
  README.md → frontend/SUMMARY_OF_CHANGES.md
- `Home()` --calls--> `readHome()`  [INFERRED]
  frontend\app\page.tsx → frontend\lib\content.ts
- `login()` --calls--> `createToken()`  [INFERRED]
  frontend\app\actions\auth.ts → frontend\lib\auth.ts
- `login()` --calls--> `resetRateLimit()`  [INFERRED]
  frontend\app\actions\auth.ts → frontend\lib\security.ts

## Hyperedges (group relationships)
- **Security Layer Stack (CSRF + Rate Limiting + Auth + Input Sanitization)** — summary_csrf_origin_check, summary_rate_limiting, summary_auth_hardening, summary_input_sanitization [EXTRACTED 0.95]
- **Content CMS Flow (Admin Panel + Firestore + ISR Revalidation)** — readme_admin_panel, readme_content_infrastructure, readme_isr_revalidation [EXTRACTED 0.90]
- **Upload Pipeline (Upload API + Cloudinary + Magic Byte Validation)** — readme_upload_api, summary_cloudinary_integration, summary_magic_byte_validation [EXTRACTED 0.92]

## Communities

### Community 0 - "Admin Write Actions"
Cohesion: 0.09
Nodes (42): requireAdminSession(), saveAboutHero(), saveAboutRecognition(), saveAboutSharedLeadership(), saveAboutVisionMissionValues(), saveAboutWhyYouth(), saveFeaturedProjects(), saveFooter() (+34 more)

### Community 1 - "Content Read & Firestore"
Cohesion: 0.07
Nodes (25): legacyFallback(), readAbout(), readContent(), readShared(), readTeam(), writeAbout(), writeContent(), writeDoc() (+17 more)

### Community 2 - "Project Docs & Design System"
Cohesion: 0.07
Nodes (34): Clean Modular Component-Based Architecture, Design Guidelines (glassmorphism, asymmetry, animations), Frontend Engineer Persona (Next.js + Tailwind specialist), Mobile-First Responsive Design, Next.js create-next-app Bootstrap (Geist font, App Router), Yuva Sarthi Logo, Rationale: Migrate uploads to object storage for serverless durability, Rationale: Firebase Admin SDK needed for server-side writes with strict Firestore rules (+26 more)

### Community 3 - "Auth & Image Upload"
Cohesion: 0.15
Nodes (14): login(), ensureCloudinaryConfig(), uploadBuffer(), uploadImageToCloudinary(), POST(), consumeRateLimit(), detectImageMime(), getClientIp() (+6 more)

### Community 4 - "Get Involved Pages"
Cohesion: 0.11
Nodes (10): readGetInvolved(), GetInvolvedCollaborateAdminPage(), GetInvolvedHeroAdminPage(), GetInvolvedInternAdminPage(), GetInvolvedInviteFoundersAdminPage(), GetInvolvedInvolvementGridAdminPage(), GetInvolvedStatsAdminPage(), GetInvolvedTestimonialsAdminPage() (+2 more)

### Community 5 - "What We Do Pages"
Cohesion: 0.13
Nodes (9): readWhatWeDo(), generateStaticParams(), toSlug(), WwdApproachAdminPage(), WwdHeroAdminPage(), WwdImpactAdminPage(), WwdPreviousProjectsAdminPage(), WwdProblemAdminPage() (+1 more)

### Community 6 - "Home Page"
Cohesion: 0.13
Nodes (8): readHome(), HeroAdminPage(), ImpactAdminPage(), JoinUsAdminPage(), ProjectsAdminPage(), RecognitionsAdminPage(), StoriesAdminPage(), WhoWeAreAdminPage()

### Community 7 - "Token & Auth Utilities"
Cohesion: 0.33
Nodes (9): createToken(), encodePayload(), getAdminCollectionName(), getAdminSecret(), getCurrentTokenVersion(), readTokenVersionFromFirestore(), signPayload(), verifyToken() (+1 more)

### Community 8 - "Hero Admin Forms"
Cohesion: 0.36
Nodes (3): Field(), Input(), set()

### Community 9 - "Color Utils & Team UI"
Cohesion: 0.4
Nodes (3): isHexColor(), toPickerHex(), TeamCard()

### Community 10 - "Array Field Editor"
Cohesion: 0.4
Nodes (0): 

### Community 11 - "Problem Section Admin"
Cohesion: 0.4
Nodes (0): 

### Community 12 - "Featured Projects Admin"
Cohesion: 0.5
Nodes (0): 

### Community 13 - "Impact Stats Admin"
Cohesion: 0.5
Nodes (0): 

### Community 14 - "Recognitions Admin"
Cohesion: 0.5
Nodes (0): 

### Community 15 - "Stories Updates Admin"
Cohesion: 0.5
Nodes (0): 

### Community 16 - "Who We Are Admin"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Recognition Admin"
Cohesion: 0.5
Nodes (0): 

### Community 18 - "Shared Leadership Admin"
Cohesion: 0.5
Nodes (0): 

### Community 19 - "Vision Mission Admin"
Cohesion: 0.5
Nodes (0): 

### Community 20 - "Why Youth Admin"
Cohesion: 0.5
Nodes (0): 

### Community 21 - "Stats Admin Form"
Cohesion: 0.5
Nodes (0): 

### Community 22 - "Testimonials Admin"
Cohesion: 0.5
Nodes (0): 

### Community 23 - "Why Join Admin"
Cohesion: 0.5
Nodes (0): 

### Community 24 - "Team Grid Admin"
Cohesion: 0.5
Nodes (0): 

### Community 25 - "Approach Admin Form"
Cohesion: 0.5
Nodes (0): 

### Community 26 - "Impact Admin Form"
Cohesion: 0.5
Nodes (0): 

### Community 27 - "Previous Projects Admin"
Cohesion: 0.5
Nodes (0): 

### Community 28 - "Recognition Display"
Cohesion: 0.5
Nodes (2): getIcon(), RecognitionNode()

### Community 29 - "Footer Admin Form"
Cohesion: 0.67
Nodes (0): 

### Community 30 - "Join Us Admin"
Cohesion: 0.67
Nodes (0): 

### Community 31 - "Navbar Admin"
Cohesion: 0.67
Nodes (0): 

### Community 32 - "Collaborate Admin"
Cohesion: 0.67
Nodes (0): 

### Community 33 - "Intern Admin Form"
Cohesion: 0.67
Nodes (0): 

### Community 34 - "Invite Founders Admin"
Cohesion: 0.67
Nodes (0): 

### Community 35 - "Volunteer Admin"
Cohesion: 0.67
Nodes (0): 

### Community 36 - "Problem Section Display"
Cohesion: 0.67
Nodes (0): 

### Community 37 - "Photo Carousel"
Cohesion: 0.67
Nodes (0): 

### Community 38 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Admin Dashboard"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "About Admin Page"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Get Involved Admin Page"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Team Admin Page"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Smooth Scroll Provider"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Admin Scroll"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Image Upload UI"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Section Shell"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Admin Sidebar"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Involvement Grid Admin"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Site Footer"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Who We Are Section"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Collaborate Section"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Invite Founders Section"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Involvement Grid"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Volunteer Section"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Previous Projects"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Projects Section"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Button Component"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Card Component"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Social Icons"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "DB Seed Script"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Dev Sync Script"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Next.js Env Types"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 66 - "Standalone Page"
Cohesion: 1.0
Nodes (0): 

### Community 67 - "Standalone Page"
Cohesion: 1.0
Nodes (0): 

### Community 68 - "Standalone Page"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Form Group Component"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Navbar Component"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Featured Projects Section"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Hero Section"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Impact Stats Section"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Join Us Section"
Cohesion: 1.0
Nodes (0): 

### Community 75 - "Recognitions Section"
Cohesion: 1.0
Nodes (0): 

### Community 76 - "Stories Updates Section"
Cohesion: 1.0
Nodes (0): 

### Community 77 - "About Hero Section"
Cohesion: 1.0
Nodes (0): 

### Community 78 - "Shared Leadership Block"
Cohesion: 1.0
Nodes (0): 

### Community 79 - "Vision Mission Values"
Cohesion: 1.0
Nodes (0): 

### Community 80 - "Why Youth Section"
Cohesion: 1.0
Nodes (0): 

### Community 81 - "Intern Section"
Cohesion: 1.0
Nodes (0): 

### Community 82 - "Involvement Stats"
Cohesion: 1.0
Nodes (0): 

### Community 83 - "Testimonials Section"
Cohesion: 1.0
Nodes (0): 

### Community 84 - "Why Join Section"
Cohesion: 1.0
Nodes (0): 

### Community 85 - "Team Grid Section"
Cohesion: 1.0
Nodes (0): 

### Community 86 - "Approach Section"
Cohesion: 1.0
Nodes (0): 

### Community 87 - "Impact Section"
Cohesion: 1.0
Nodes (0): 

### Community 88 - "Container Component"
Cohesion: 1.0
Nodes (0): 

### Community 89 - "Firebase Client"
Cohesion: 1.0
Nodes (0): 

### Community 90 - "Firestore Seed Script"
Cohesion: 1.0
Nodes (0): 

### Community 91 - "Content Types"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **13 isolated node(s):** `Incremental Static Regeneration (ISR revalidate=3600)`, `Framer Motion`, `TypeScript`, `Vercel Deployment`, `Clean Modular Component-Based Architecture` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Root Layout`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Dashboard`** (2 nodes): `page.tsx`, `AdminPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Admin Page`** (2 nodes): `page.tsx`, `AboutAdminPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Get Involved Admin Page`** (2 nodes): `page.tsx`, `GetInvolvedAdminPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Team Admin Page`** (2 nodes): `page.tsx`, `TeamAdminPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Smooth Scroll Provider`** (2 nodes): `LenisProvider.tsx`, `LenisProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Scroll`** (2 nodes): `AdminLenis()`, `AdminLenis.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Upload UI`** (2 nodes): `ImageUploader.tsx`, `handleFile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Section Shell`** (2 nodes): `SectionShell.tsx`, `handleSave()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Sidebar`** (2 nodes): `Sidebar.tsx`, `toggleGroup()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Involvement Grid Admin`** (2 nodes): `InvolvementGridForm.tsx`, `Field()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Footer`** (2 nodes): `Footer()`, `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Who We Are Section`** (2 nodes): `WhoWeAre.tsx`, `WhoWeAre()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Collaborate Section`** (2 nodes): `CollaborateSection()`, `CollaborateSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Invite Founders Section`** (2 nodes): `InviteFoundersSection.tsx`, `InviteFoundersSection()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Involvement Grid`** (2 nodes): `InvolvementGrid.tsx`, `InviteCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Volunteer Section`** (2 nodes): `VolunteerSection.tsx`, `VolunteerSection()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Previous Projects`** (2 nodes): `PreviousProjects.tsx`, `toSlug()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Section`** (2 nodes): `ProjectsSection.tsx`, `toSlug()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (2 nodes): `Button()`, `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Card Component`** (2 nodes): `Card()`, `Card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Social Icons`** (2 nodes): `SocialIcons.tsx`, `LinkedinIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `DB Seed Script`** (2 nodes): `seed.mjs`, `seed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dev Sync Script`** (2 nodes): `sync-dev.mjs`, `sync()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Env Types`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Standalone Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Standalone Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Standalone Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Group Component`** (1 nodes): `FormGroup.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar Component`** (1 nodes): `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Featured Projects Section`** (1 nodes): `FeaturedProjects.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Section`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Impact Stats Section`** (1 nodes): `ImpactStats.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Join Us Section`** (1 nodes): `JoinUs.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Recognitions Section`** (1 nodes): `Recognitions.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stories Updates Section`** (1 nodes): `StoriesUpdates.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Hero Section`** (1 nodes): `AboutHero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Leadership Block`** (1 nodes): `SharedLeadershipBlock.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vision Mission Values`** (1 nodes): `VisionMissionValues.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Why Youth Section`** (1 nodes): `WhyYouth.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Intern Section`** (1 nodes): `InternSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Involvement Stats`** (1 nodes): `InvolvementStats.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Testimonials Section`** (1 nodes): `Testimonials.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Why Join Section`** (1 nodes): `WhyJoin.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Team Grid Section`** (1 nodes): `TeamGrid.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Approach Section`** (1 nodes): `ApproachSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Impact Section`** (1 nodes): `ImpactSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Container Component`** (1 nodes): `Container.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Firebase Client`** (1 nodes): `firebase.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Firestore Seed Script`** (1 nodes): `seed-firestore.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Content Types`** (1 nodes): `content.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAdminSession()` connect `Admin Write Actions` to `Auth & Image Upload`, `Token & Auth Utilities`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `readGetInvolved()` connect `Get Involved Pages` to `Admin Write Actions`, `Content Read & Firestore`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `readHome()` connect `Home Page` to `Admin Write Actions`, `Content Read & Firestore`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `withSaveGetInvolved()` (e.g. with `readGetInvolved()` and `sanitizeInput()`) actually correct?**
  _`withSaveGetInvolved()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `withSaveHome()` (e.g. with `readHome()` and `sanitizeInput()`) actually correct?**
  _`withSaveHome()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `readGetInvolved()` (e.g. with `withSaveGetInvolved()` and `GetInvolvedCollaborateAdminPage()`) actually correct?**
  _`readGetInvolved()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `withSaveWwd()` (e.g. with `readWhatWeDo()` and `sanitizeInput()`) actually correct?**
  _`withSaveWwd()` has 3 INFERRED edges - model-reasoned connections that need verification._