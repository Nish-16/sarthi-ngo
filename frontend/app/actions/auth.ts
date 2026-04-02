"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { COOKIE_NAME, COOKIE_MAX_AGE, createToken } from "@/lib/auth";

export async function login(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
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

  const token = createToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
