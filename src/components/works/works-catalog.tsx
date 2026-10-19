"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Grid, List } from "lucide-react";
import { IndexLabel } from "@/components/ui/index-label";
import { Badge } from "@/components/ui/badge";
import {
  Project,
  ProjectType,
  ProjectStatus,
  PROJECT_TYPES,
  projectTypeLabels,
} from "@/domain/project";
import { cn } from "@/lib/utils";

interface WorksCatalogProps {
  initialProjects: Project[];
}

export function WorksCatalog({ initialProjects }: WorksCatalogProps) {
  const [selectedType, setSelectedType] = useState<ProjectType | "semua">("semua");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "semua">("semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchType =
        selectedType === "semua" ? true : project.type === selectedType;
      const matchStatus =
        selectedStatus === "semua" ? true : project.status === selectedStatus;
      return matchType && matchStatus;
    });
  }, [initialProjects, selectedType, selectedStatus]);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Controls Bar: Filters & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-6 border-y border-ink-hairline">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setSelectedType("semua")}
            className={cn(
              "px-4 py-2 rounded-full font-mono text-label uppercase tracking-wider transition-colors select-none",
              selectedType === "semua"
                ? "bg-ink text-paper"
                : "text-graphite hover:text-ink hover:bg-bone/40"
            )}
          >
            Semua ({initialProjects.length})
          </button>

          {PROJECT_TYPES.map((type) => {
            const count = initialProjects.filter((p) => p.type === type).length;
            if (count === 0) return null;

            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-4 py-2 rounded-full font-mono text-label uppercase tracking-wider transition-colors select-none",
                  selectedType === type
                    ? "bg-ink text-paper"
                    : "text-graphite hover:text-ink hover:bg-bone/40"
                )}
              >
                {projectTypeLabels[type].id} ({count})
              </button>
            );
          })}
        </div>

        {/* Status Filter & View Mode Toggle */}
        <div className="flex items-center justify-between lg:justify-end gap-6">
          <div className="flex items-center gap-2 font-mono text-label uppercase">
            <button
              type="button"
              onClick={() => setSelectedStatus("semua")}
              className={cn(
                "pb-0.5 border-b transition-colors",
                selectedStatus === "semua"
                  ? "border-ink text-ink font-semibold"
                  : "border-transparent text-stone hover:text-graphite"
              )}
            >
              Semua Status
            </button>
            <span className="text-stone">&bull;</span>
            <button
              type="button"
              onClick={() => setSelectedStatus("selesai")}
              className={cn(
                "pb-0.5 border-b transition-colors",
                selectedStatus === "selesai"
                  ? "border-ink text-ink font-semibold"
                  : "border-transparent text-stone hover:text-graphite"
              )}
            >
              Selesai
            </button>
            <span className="text-stone">&bull;</span>
            <button
              type="button"
              onClick={() => setSelectedStatus("dibangun")}
              className={cn(
                "pb-0.5 border-b transition-colors",
                selectedStatus === "dibangun"
                  ? "border-ink text-ink font-semibold"
                  : "border-transparent text-stone hover:text-graphite"
              )}
            >
              Dalam Pembangunan
            </button>
          </div>

          {/* Grid vs List toggle */}
          <div className="flex items-center gap-1 border border-ink-hairline rounded-full p-1 bg-paper">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Tampilan Grid Asimetris"
              className={cn(
                "p-1.5 rounded-full transition-colors",
                viewMode === "grid" ? "bg-ink text-paper" : "text-stone hover:text-ink"
              )}
            >
              <Grid size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="Tampilan Daftar Baris"
              className={cn(
                "p-1.5 rounded-full transition-colors",
                viewMode === "list" ? "bg-ink text-paper" : "text-stone hover:text-ink"
              )}
            >
              <List size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-24 text-center flex flex-col items-center gap-4">
          <p className="font-sans text-xl text-graphite">
            Tidak ada proyek yang sesuai dengan filter yang dipilih.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedType("semua");
              setSelectedStatus("semua");
            }}
            className="font-mono text-label uppercase text-ink underline"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* Grid Mode: Editorial Asymmetrical Layout */}
      {viewMode === "grid" && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical grid rhythm: item 0 & 3 span 7 cols, item 1 & 2 span 5 cols
            const isWide = idx % 4 === 0 || idx % 4 === 3;
            const colSpan = isWide ? "md:col-span-7" : "md:col-span-5";
            const aspect = isWide ? "aspect-[16/10]" : "aspect-[4/5]";
            const coverImage = project.images.find((img) => img.isCover) || project.images[0];

            return (
              <article key={project.id} className={cn("flex flex-col gap-4 group", colSpan)}>
                <Link
                  href={`/karya/${project.slug}`}
                  className="relative w-full overflow-hidden bg-bone block"
                >
                  <div className={cn("relative w-full overflow-hidden", aspect)}>
                    {coverImage && (
                      <Image
                        src={coverImage.path}
                        alt={coverImage.altId || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>

                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between font-mono text-mono text-stone">
                    <div className="flex items-center gap-3">
                      <IndexLabel index={idx + 1} />
                      <span className="text-graphite uppercase">{project.city}</span>
                    </div>
                    {project.status === "dibangun" ? (
                      <Badge variant="clay" withDot>
                        Pembangunan
                      </Badge>
                    ) : (
                      <span>{project.year}</span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-sans text-2xl font-medium tracking-tight text-ink group-hover:text-black">
                      <Link href={`/karya/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h2>

                    <Link
                      href={`/karya/${project.slug}`}
                      className="font-mono text-label uppercase tracking-wider text-graphite group-hover:text-ink inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Lihat</span>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <p className="font-sans text-sm text-graphite line-clamp-2 leading-relaxed">
                    {project.summaryId}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* List Mode: Clean Numbered Rows */}
      {viewMode === "list" && filteredProjects.length > 0 && (
        <div className="flex flex-col border-t border-ink-hairline">
          {filteredProjects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/karya/${project.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-2 border-b border-ink-hairline hover:bg-bone/25 transition-colors"
            >
              <div className="flex items-baseline gap-6">
                <IndexLabel index={idx + 1} />
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-2xl font-medium tracking-tight text-ink">
                    {project.title}
                  </span>
                  <span className="font-mono text-mono text-graphite">
                    {project.city} &bull; {projectTypeLabels[project.type]?.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 pt-3 sm:pt-0">
                {project.status === "dibangun" ? (
                  <Badge variant="clay" withDot>
                    Dalam Pembangunan
                  </Badge>
                ) : (
                  <span className="font-mono text-mono text-stone">{project.year}</span>
                )}

                <div className="inline-flex items-center gap-1 font-mono text-label uppercase tracking-wider text-ink">
                  <span>Eksplorasi</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
