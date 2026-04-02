"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string; // e.g. "16/9", "1/1"
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  aspectRatio = "16/9",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value.startsWith("http") ? value : "");
  const [mode, setMode] = useState<"upload" | "url">(
    value.startsWith("/uploads") ? "upload" : "url"
  );

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>

      {/* Mode tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {(["url", "upload"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              mode === m
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {m === "url" ? "URL" : "Upload"}
          </button>
        ))}
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={urlInput}
          placeholder="https://images.unsplash.com/..."
          onChange={(e) => {
            setUrlInput(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        />
      ) : (
        <div
          className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-indigo-600 text-sm font-medium py-4">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Uploading…
            </div>
          ) : (
            <div className="text-slate-400 text-sm py-2">
              <p className="font-medium text-slate-600">Click to upload</p>
              <p className="text-xs mt-1">PNG, JPG, WebP · Max 5 MB</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      {/* Preview */}
      {value && (
        <div
          className="relative w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
          style={{ aspectRatio }}
        >
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={value.startsWith("/uploads")}
          />
        </div>
      )}
    </div>
  );
}
