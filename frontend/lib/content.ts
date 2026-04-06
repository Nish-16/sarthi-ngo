import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { PageContent } from "@/types/content";

const COLLECTION = process.env.FIREBASE_COLLECTION ?? "dev_content";
const DOC_ID = "page";

export async function readContent(): Promise<PageContent> {
  const ref = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error(`Content document not found in collection "${COLLECTION}"`);
  }
  return snap.data() as PageContent;
}

export async function writeContent(content: PageContent): Promise<void> {
  const ref = doc(db, COLLECTION, DOC_ID);
  await setDoc(ref, content);
}
