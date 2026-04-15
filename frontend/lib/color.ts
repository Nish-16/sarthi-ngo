const COLOR_TOKEN_MAP: Array<{ token: string; hex: string }> = [
  { token: "orange", hex: "#f97316" },
  { token: "amber", hex: "#f59e0b" },
  { token: "indigo", hex: "#6366f1" },
  { token: "rose", hex: "#f43f5e" },
  { token: "emerald", hex: "#10b981" },
  { token: "purple", hex: "#a855f7" },
  { token: "cyan", hex: "#06b6d4" },
  { token: "teal", hex: "#14b8a6" },
  { token: "blue", hex: "#3b82f6" },
  { token: "pink", hex: "#ec4899" },
  { token: "sky", hex: "#0ea5e9" },
  { token: "red", hex: "#ef4444" },
];

export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{6})$/.test(value.trim());
}

export function toPickerHex(value: string, fallback = "#6366f1"): string {
  const trimmed = value.trim();

  if (isHexColor(trimmed)) {
    return trimmed.toLowerCase();
  }

  const lowered = trimmed.toLowerCase();
  const mapped = COLOR_TOKEN_MAP.find((item) => lowered.includes(item.token));
  return mapped?.hex ?? fallback;
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
