import { ReactNode } from "react";

interface FormGroupProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function FormGroup({ title, description, children }: FormGroupProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="p-5 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
