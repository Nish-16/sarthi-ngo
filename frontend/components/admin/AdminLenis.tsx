"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface AdminLenisProps {
  children: ReactNode;
}

export default function AdminLenis({ children }: AdminLenisProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.0,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex-1 overflow-y-auto">
      <div ref={contentRef} className="p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
