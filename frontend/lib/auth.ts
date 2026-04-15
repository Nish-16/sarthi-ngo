import crypto from "crypto";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const COOKIE_NAME = "sarthi_admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type AdminTokenPayload = {
  iat: number;
  exp: number;
  nonce: string;
  tv: number;
};

const PLACEHOLDER_SECRET = "replace-this-with-a-strong-random-secret";
let runtimeSecret: string | undefined;
let tokenVersionCache: { value: number; expiresAt: number } | undefined;

const TOKEN_VERSION_DOC_ID = "admin_security";
const TOKEN_VERSION_FIELD = "tokenVersion";
const TOKEN_VERSION_CACHE_MS = 30 * 1000;

function getAdminCollectionName(): string {
  return process.env.FIREBASE_COLLECTION?.trim() || "dev_content";
}

function getAdminSecret(): string {
  const configuredSecret = process.env.ADMIN_SECRET?.trim();

  if (
    configuredSecret &&
    configuredSecret !== PLACEHOLDER_SECRET &&
    configuredSecret !== "fallback-secret"
  ) {
    return configuredSecret;
  }

  runtimeSecret ??= crypto.randomBytes(32).toString("hex");
  return runtimeSecret;
}

function encodePayload(payload: AdminTokenPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function signPayload(payload: string): string {
  return crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("base64url");
}

async function readTokenVersionFromFirestore(): Promise<number | null> {
  try {
    const ref = doc(db, getAdminCollectionName(), TOKEN_VERSION_DOC_ID);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(
        ref,
        {
          [TOKEN_VERSION_FIELD]: 1,
          updatedAt: Date.now(),
        },
        { merge: true },
      );
      return 1;
    }

    const raw = snapshot.get(TOKEN_VERSION_FIELD);
    if (typeof raw === "number" && Number.isInteger(raw) && raw > 0) {
      return raw;
    }

    await setDoc(
      ref,
      {
        [TOKEN_VERSION_FIELD]: 1,
        updatedAt: Date.now(),
      },
      { merge: true },
    );
    return 1;
  } catch {
    return null;
  }
}

async function getCurrentTokenVersion(): Promise<number> {
  const now = Date.now();
  if (tokenVersionCache && tokenVersionCache.expiresAt > now) {
    return tokenVersionCache.value;
  }

  const fromFirestore = await readTokenVersionFromFirestore();
  const fallback = Number(process.env.ADMIN_TOKEN_VERSION ?? "1");
  const value =
    fromFirestore ?? (Number.isFinite(fallback) && fallback > 0 ? fallback : 1);

  tokenVersionCache = {
    value,
    expiresAt: now + TOKEN_VERSION_CACHE_MS,
  };

  return value;
}

export async function createToken(): Promise<string> {
  const now = Date.now();
  const tokenVersion = await getCurrentTokenVersion();
  const payload = encodePayload({
    iat: now,
    exp: now + COOKIE_MAX_AGE * 1000,
    nonce: crypto.randomBytes(32).toString("base64url"),
    tv: tokenVersion,
  });

  return `${payload}.${signPayload(payload)}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [payloadPart, signaturePart] = token.split(".");

    if (!payloadPart || !signaturePart) {
      return false;
    }

    const expectedSignature = signPayload(payloadPart);
    if (signaturePart.length !== expectedSignature.length) {
      return false;
    }

    const signatureMatches = crypto.timingSafeEqual(
      Buffer.from(signaturePart),
      Buffer.from(expectedSignature),
    );

    if (!signatureMatches) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(payloadPart, "base64url").toString("utf8"),
    ) as Partial<AdminTokenPayload>;

    if (typeof payload.exp !== "number" || payload.exp <= Date.now()) {
      return false;
    }

    if (
      typeof payload.tv !== "number" ||
      !Number.isInteger(payload.tv) ||
      payload.tv < 1
    ) {
      return false;
    }

    const currentTokenVersion = await getCurrentTokenVersion();
    return payload.tv === currentTokenVersion;
  } catch {
    return false;
  }
}
