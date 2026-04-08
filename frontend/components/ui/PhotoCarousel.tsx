"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  alt: string;
}

interface Props {
  photos: Photo[];
  className?: string;
}

export default function PhotoCarousel({ photos, className = "" }: Props) {
  const [current, setCurrent] = useState(0);

  if (!photos.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Slides */}
      <div className="relative h-full w-full">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Nav buttons — always visible */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white w-5" : "bg-white/60 w-1.5 hover:bg-white/80"}`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
