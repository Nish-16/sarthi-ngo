/**
 * Sync dev — copies all Firestore documents from the production collection
 * (hs-website-21095 / content) into the dev collection (hs-website-21095 / dev_content).
 *
 * Both collections live in the same Firebase project, so only one app instance
 * is needed.
 *
 * Usage:  node scripts/sync-dev.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyCp_jXV8oEbbtFT0zYuyP0jXz5QYDrCprA",
  authDomain: "hs-website-21095.firebaseapp.com",
  projectId: "hs-website-21095",
  storageBucket: "hs-website-21095.firebasestorage.app",
  messagingSenderId: "266215334852",
  appId: "1:266215334852:web:8997365164dcf32f827a91",
  measurementId: "G-70W41N4P9E",
});

const db = getFirestore(app);

const SOURCE_COLLECTION = "content";
const DEST_COLLECTION = "dev_content";

const DOC_IDS = ["shared", "home", "about", "team", "get-involved", "what-we-do", "page"];

async function sync() {
  console.log(`Syncing: ${SOURCE_COLLECTION} -> ${DEST_COLLECTION}\n`);

  let copied = 0;
  let skipped = 0;

  for (const id of DOC_IDS) {
    const snap = await getDoc(doc(db, SOURCE_COLLECTION, id));

    if (!snap.exists()) {
      console.log(`  [skip] ${id} — not found in source`);
      skipped++;
      continue;
    }

    const data = snap.data();
    await setDoc(doc(db, DEST_COLLECTION, id), data);
    console.log(`  [done] ${id} — ${Object.keys(data).length} top-level fields`);
    copied++;
  }

  console.log(`\nFinished: ${copied} copied, ${skipped} skipped.`);
  process.exit(0);
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
