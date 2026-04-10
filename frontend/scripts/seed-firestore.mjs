/**
 * One-time seed script — pushes content/page-content.json into Firestore
 * as separate per-page documents.
 *
 * Run with: node scripts/seed-firestore.mjs [--prod]
 *
 * Examples:
 *   node scripts/seed-firestore.mjs        ← seed local project (.env.local)
 *   node scripts/seed-firestore.mjs --prod ← seed prod project (.env.production)
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProd = process.argv.includes("--prod");
const envFile = isProd ? ".env.production" : ".env.local";
const envPath = join(__dirname, "..", envFile);

const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const COLLECTION = env.FIREBASE_COLLECTION ?? "dev_content";

const contentPath = join(__dirname, "..", "content", "page-content.json");
const c = JSON.parse(readFileSync(contentPath, "utf-8"));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const documents = {
  shared: {
    meta: c.meta,
    navbar: c.navbar,
    footer: c.footer,
  },
  home: {
    hero: c.hero,
    whoWeAre: c.whoWeAre,
    recognitions: c.recognitions,
    featuredProjects: c.featuredProjects,
    impactStats: c.impactStats,
    joinUs: c.joinUs,
    storiesUpdates: c.storiesUpdates,
  },
  about: c.about,
  team: c.team,
  "get-involved": c.getInvolved,
  "what-we-do": c.whatWeDo,
};

console.log(`Seeding ${Object.keys(documents).length} documents into "${COLLECTION}" in project "${firebaseConfig.projectId}" (${isProd ? "production" : "local"})...\n`);

for (const [docId, data] of Object.entries(documents)) {
  await setDoc(doc(db, COLLECTION, docId), data);
  console.log(`  ✓ ${docId}`);
}

console.log("\nDone!");
process.exit(0);
