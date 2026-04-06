/**
 * One-time seed script — pushes content/page-content.json into Firestore.
 * Run with: node scripts/seed-firestore.mjs [collection]
 *
 * Examples:
 *   node scripts/seed-firestore.mjs dev_content   ← seed dev DB
 *   node scripts/seed-firestore.mjs content        ← seed prod DB
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const collection = process.argv[2];
if (!collection) {
  console.error("Usage: node scripts/seed-firestore.mjs <collection>");
  console.error("  e.g: node scripts/seed-firestore.mjs dev_content");
  process.exit(1);
}

// Load env file manually (dotenv not needed — just read the vars)
const envPath = join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => l.split("=").map((p) => p.trim()))
);

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const contentPath = join(__dirname, "..", "content", "page-content.json");
const content = JSON.parse(readFileSync(contentPath, "utf-8"));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(`Seeding "${collection}/page" in project "${firebaseConfig.projectId}"...`);

await setDoc(doc(db, collection, "page"), content);

console.log("Done! Your Firestore is seeded.");
process.exit(0);
