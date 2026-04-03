"use client";

import { ReactNode, useTransition } from "react";

interface SectionShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSave: () => Promise<void>;
  saveResult?: { success?: boolean; error?: string } | null;
}

export default function SectionShell({
  title,
  description,
  children,
  onSave,
  saveResult,
}: SectionShellProps) {
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await onSave();
    });
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/20 shrink-0"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Result banner */}
      {saveResult?.success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Saved successfully! Changes are live on the website.
        </div>
      )}
      {saveResult?.error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {saveResult.error}
        </div>
      )}

      {/* Form content */}
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
