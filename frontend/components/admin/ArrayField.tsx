"use client";

import { ReactNode } from "react";

interface ArrayFieldProps<T> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  renderItem: (item: T, index: number, onChange: (item: T) => void) => ReactNode;
  maxItems?: number;
}

export default function ArrayField<T>({
  label,
  items,
  onChange,
  createItem,
  renderItem,
  maxItems,
}: ArrayFieldProps<T>) {
  function updateItem(index: number, updated: T) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, createItem()]);
  }

  function moveItem(from: number, to: number) {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {(!maxItems || items.length < maxItems) && (
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
            {/* Controls */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => moveItem(i, i - 1)}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Move up"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              )}
              {i < items.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveItem(i, i + 1)}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Move down"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="pr-16">
              {renderItem(item, i, (updated) => updateItem(i, updated))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
            No items yet. Click &ldquo;Add&rdquo; to add one.
          </div>
        )}
      </div>
    </div>
  );
}
