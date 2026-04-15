type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

const JPEG_MAGIC = [0xff, 0xd8, 0xff];
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (forwardedFor) {
    return forwardedFor;
  }

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const vercelIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercelIp) {
    return vercelIp;
  }

  return "unknown";
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  existing.count += 1;
  rateLimits.set(key, existing);

  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }

  return {
    allowed: true,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function resetRateLimit(key: string): void {
  rateLimits.delete(key);
}

function normalizeOrigin(origin: string): string | null {
  try {
    const parsed = new URL(origin);
    return parsed.origin;
  } catch {
    return null;
  }
}

function getConfiguredAllowedOrigins(): Set<string> {
  const configured = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => normalizeOrigin(item))
    .filter((item): item is string => Boolean(item));

  const allowed = new Set<string>(configured);
  const siteUrl = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  if (siteUrl) {
    allowed.add(siteUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const normalizedVercel = normalizeOrigin(`https://${vercelUrl}`);
    if (normalizedVercel) {
      allowed.add(normalizedVercel);
    }
  }

  return allowed;
}

export function getRequestHostOrigin(headers: Headers): string | null {
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) {
    return null;
  }

  const protocol =
    headers.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");

  return normalizeOrigin(`${protocol}://${host}`);
}

export function isAllowedRequestOrigin(
  headers: Headers,
  fallbackOrigin?: string,
): boolean {
  const requestOrigin = headers.get("origin");
  if (!requestOrigin) {
    return true;
  }

  const normalizedRequestOrigin = normalizeOrigin(requestOrigin);
  if (!normalizedRequestOrigin) {
    return false;
  }

  const allowed = getConfiguredAllowedOrigins();
  const requestHostOrigin = getRequestHostOrigin(headers);

  if (requestHostOrigin) {
    allowed.add(requestHostOrigin);
  }

  if (fallbackOrigin) {
    const normalizedFallback = normalizeOrigin(fallbackOrigin);
    if (normalizedFallback) {
      allowed.add(normalizedFallback);
    }
  }

  return allowed.has(normalizedRequestOrigin);
}

function sanitizeString(value: string): string {
  return value
    .replace(/\u0000/g, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/data:text\/html/gi, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function sanitizeInput<T>(input: T): T {
  if (typeof input === "string") {
    return sanitizeString(input) as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput(item)) as T;
  }

  if (input && typeof input === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(
      input as Record<string, unknown>,
    )) {
      output[key] = sanitizeInput(value);
    }
    return output as T;
  }

  return input;
}

export function detectImageMime(
  buffer: Buffer,
): "image/jpeg" | "image/png" | null {
  const isJpeg = JPEG_MAGIC.every((byte, index) => buffer[index] === byte);
  if (isJpeg) {
    return "image/jpeg";
  }

  const isPng = PNG_MAGIC.every((byte, index) => buffer[index] === byte);
  if (isPng) {
    return "image/png";
  }

  return null;
}
