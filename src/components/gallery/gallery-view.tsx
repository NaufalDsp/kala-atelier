"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, ArrowUpRight } from "lucide-react";
import { Project, ProjectImage } from "@/domain/project";
import { cn } from "@/lib/utils";

interface GalleryItem extends ProjectImage {
  projectTitle: string;
  projectSlug: string;
  projectCity: string;
}

interface GalleryViewProps {
  projects: Project[];
}

export function GalleryView({ projects }: GalleryViewProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("semua");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Flatten all images with project context
  const allItems: GalleryItem[] = useMemo(() => {
    return projects.flatMap((p) =>
      p.images.map((img) => ({
        ...img,
        projectTitle: p.title,
        projectSlug: p.slug,
        projectCity: p.city,
      }))
    );
  }, [projects]);

  const filteredItems = useMemo(() => {
    if (selectedSlug === "semua") return allItems;
    return allItems.filter((item) => item.projectSlug === selectedSlug);
  }, [allItems, selectedSlug]);

  const activeItem =
    activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  }, [activeImageIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  }, [activeImageIndex, filteredItems.length]);

  // Keyboard navigation for accessible lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Filter Tabs by Project */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-ink-hairline">
        <button
          type="button"
          onClick={() => {
            setSelectedSlug("semua");
            setActiveImageIndex(null);
          }}
          className={cn(
            "px-4 py-2 rounded-full font-mono text-label uppercase tracking-wider transition-colors select-none",
            selectedSlug === "semua"
              ? "bg-ink text-paper"
              : "text-graphite hover:text-ink hover:bg-bone/40"
          )}
        >
          Semua Foto ({allItems.length})
        </button>

        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => {
              setSelectedSlug(proj.slug);
              setActiveImageIndex(null);
            }}
            className={cn(
              "px-4 py-2 rounded-full font-mono text-label uppercase tracking-wider transition-colors select-none shrink-0",
              selectedSlug === proj.slug
                ? "bg-ink text-paper"
                : "text-graphite hover:text-ink hover:bg-bone/40"
            )}
          >
            {proj.title} ({proj.images.length})
          </button>
        ))}
      </div>

      {/* Masonry-Style Asymmetrical Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveImageIndex(idx)}
            className="group relative cursor-pointer overflow-hidden bg-bone border border-ink-hairline flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.path}
                alt={item.altId}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 bg-paper flex flex-col gap-1 border-t border-ink-hairline">
              <div className="flex items-center justify-between font-mono text-[11px] text-stone">
                <span className="uppercase">{item.projectTitle}</span>
                <span>{item.projectCity}</span>
              </div>
              <p className="font-sans text-xs text-graphite line-clamp-1">
                {item.altId}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {activeItem && activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan detail foto arsitektur"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col justify-between p-6 sm:p-10 select-none backdrop-blur-md"
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-paper/80 font-mono text-mono border-b border-paper/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="uppercase text-paper font-semibold">
                {activeItem.projectTitle}
              </span>
              <span>&bull;</span>
              <span>{activeItem.projectCity}</span>
            </div>

            <div className="flex items-center gap-6">
              <span>
                ({activeImageIndex + 1}/{filteredItems.length})
              </span>
              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                aria-label="Tutup pratinjau"
                className="p-1.5 rounded-full hover:bg-paper/15 text-paper transition-colors focus-visible:outline focus-visible:outline-2"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Central Image with Prev / Next Arrow Controls */}
          <div className="relative flex-1 flex items-center justify-center my-6">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto sebelumnya"
              className="absolute left-0 sm:left-4 z-10 p-3 rounded-full bg-ink/60 text-paper hover:bg-paper/20 transition-colors focus-visible:outline focus-visible:outline-2"
            >
              <ArrowLeft size={22} strokeWidth={1.5} />
            </button>

            {/* Active Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={activeItem.path}
                alt={activeItem.altId}
                fill
                priority
                sizes="90vw"
                className="object-contain object-center"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto berikutnya"
              className="absolute right-0 sm:right-4 z-10 p-3 rounded-full bg-ink/60 text-paper hover:bg-paper/20 transition-colors focus-visible:outline focus-visible:outline-2"
            >
              <ArrowRight size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Lightbox Bottom Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-paper/80 font-mono text-mono border-t border-paper/15 pt-4">
            <p className="font-sans text-sm text-paper max-w-2xl">
              {activeItem.altId}
            </p>

            <Link
              href={`/karya/${activeItem.projectSlug}`}
              onClick={() => setActiveImageIndex(null)}
              className="group inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-wider text-paper hover:text-stone transition-colors self-start sm:self-auto"
            >
              <span>Buka Detail Proyek</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

