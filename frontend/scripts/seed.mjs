/**
 * Seed script — copies all Firestore documents from the source project
 * (sarthi-ngo / dev_content) to the destination project (hs-website-21095 / content).
 *
 * Uses the Firebase client SDK (no Admin SDK required).
 *
 * Usage:  node scripts/seed.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ─── Source: sarthi-ngo (from .env.local) ────────────────────────────────────

const sourceApp = initializeApp(
  {
    apiKey: "AIzaSyAHwLX4BK1s3G-9fDt4IkZt0DrTcfEZI70",
    authDomain: "sarthi-ngo.firebaseapp.com",
    projectId: "sarthi-ngo",
    storageBucket: "sarthi-ngo.firebasestorage.app",
    messagingSenderId: "442757512186",
    appId: "1:442757512186:web:c116160349207038458243",
    measurementId: "G-D9QYCDFDKQ",
  },
  "source"
);

// ─── Destination: hs-website-21095 (from .env.production) ────────────────────

const destApp = initializeApp(
  {
    apiKey: "AIzaSyCp_jXV8oEbbtFT0zYuyP0jXz5QYDrCprA",
    authDomain: "hs-website-21095.firebaseapp.com",
    projectId: "hs-website-21095",
    storageBucket: "hs-website-21095.firebasestorage.app",
    messagingSenderId: "266215334852",
    appId: "1:266215334852:web:8997365164dcf32f827a91",
    measurementId: "G-70W41N4P9E",
  },
  "dest"
);

const sourceDb = getFirestore(sourceApp);
const destDb = getFirestore(destApp);

const SOURCE_COLLECTION = "dev_content";
const DEST_COLLECTION = "content";

const DOC_IDS = ["shared", "home", "about", "team", "get-involved", "what-we-do", "page"];

async function seed() {
  console.log(
    `Seeding: ${sourceApp.options.projectId}/${SOURCE_COLLECTION} -> ${destApp.options.projectId}/${DEST_COLLECTION}\n`
  );

  let copied = 0;
  let skipped = 0;

  for (const id of DOC_IDS) {
    const snap = await getDoc(doc(sourceDb, SOURCE_COLLECTION, id));

    if (!snap.exists()) {
      console.log(`  [skip] ${id} — not found in source`);
      skipped++;
      continue;
    }

    const data = snap.data();
    await setDoc(doc(destDb, DEST_COLLECTION, id), data);
    console.log(`  [done] ${id} — ${Object.keys(data).length} top-level fields`);
    copied++;
  }

  console.log(`\nFinished: ${copied} copied, ${skipped} skipped.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
