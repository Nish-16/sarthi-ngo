"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { COOKIE_NAME, COOKIE_MAX_AGE, createToken } from "@/lib/auth";
import {
  consumeRateLimit,
  getClientIp,
  isAllowedRequestOrigin,
  resetRateLimit,
} from "@/lib/security";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_ATTEMPT_WINDOW_MS = 60 * 1000;

export async function login(
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const headerStore = await headers();

  if (!isAllowedRequestOrigin(headerStore)) {
    return { error: "Forbidden request origin." };
  }

  const clientIp = getClientIp(headerStore);
  const rateKey = `login:${clientIp}`;
  const rateLimit = consumeRateLimit(
    rateKey,
    LOGIN_ATTEMPT_LIMIT,
    LOGIN_ATTEMPT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return {
      error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds}s.`,
    };
  }

  const username = (formData.get("username") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedUsername || !expectedPassword) {
    return { error: "Admin credentials are not configured." };
  }

  // Constant-time comparison for both fields
  const uBuf = Buffer.from(username.padEnd(expectedUsername.length));
  const pBuf = Buffer.from(password.padEnd(expectedPassword.length));
  const uMatch =
    username.length === expectedUsername.length &&
    crypto.timingSafeEqual(uBuf, Buffer.from(expectedUsername));
  const pMatch =
    password.length === expectedPassword.length &&
    crypto.timingSafeEqual(pBuf, Buffer.from(expectedPassword));

  if (!uMatch || !pMatch) {
    return { error: "Incorrect username or password." };
  }

  const token = await createToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  resetRateLimit(rateKey);

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
