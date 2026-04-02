import crypto from "crypto";

export const COOKIE_NAME = "sarthi_admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function createToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "fallback-secret";
  const username = process.env.ADMIN_USERNAME ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return crypto
    .createHmac("sha256", secret)
    .update(`${username}:${password}`)
    .digest("hex");
}

export function verifyToken(token: string): boolean {
  try {
    const expected = createToken();
    return crypto.timingSafeEqual(
      Buffer.from(token, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}
