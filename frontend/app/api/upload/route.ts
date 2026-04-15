import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import {
  consumeRateLimit,
  detectImageMime,
  getClientIp,
  isAllowedRequestOrigin,
} from "@/lib/security";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const UPLOAD_ATTEMPT_LIMIT = 10;
const UPLOAD_ATTEMPT_WINDOW_MS = 60 * 1000;

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAllowedRequestOrigin(request.headers, request.nextUrl.origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientIp = getClientIp(request.headers);
  const rateLimit = consumeRateLimit(
    `upload:${clientIp}`,
    UPLOAD_ATTEMPT_LIMIT,
    UPLOAD_ATTEMPT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many upload attempts. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BYTES + 256 * 1024) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only JPEG and PNG are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File exceeds 5 MB limit" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detectedMime = detectImageMime(buffer);
  if (!detectedMime || detectedMime !== file.type) {
    return NextResponse.json(
      { error: "File content does not match the declared image type." },
      { status: 400 },
    );
  }

  let url: string;
  try {
    url = await uploadImageToCloudinary(buffer);
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url });
}
