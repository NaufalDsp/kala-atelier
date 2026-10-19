"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Badge } from "@/components/ui/badge";
import { Pill } from "@/components/ui/pill";
import { Project, projectTypeLabels } from "@/domain/project";
import { cn } from "@/lib/utils";

interface WorkListProps {
  projects: Project[];
}

export function WorkList({ projects }: WorkListProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(
    projects[0] || null
  );

  return (
    <section className="py-24 md:py-32 bg-paper text-ink border-b border-ink-hairline">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-ink-hairline">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <IndexLabel index={3} />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Karya Pilihan
              </span>
            </div>

            <h2 className="font-sans text-display font-medium tracking-tight-title text-ink leading-none">
              Karya Studio
            </h2>
          </div>

          <p className="font-sans text-base text-graphite max-w-md text-pretty">
            Koleksi proyek terpilih yang mewakili respons kontekstual kami terhadap iklim tropis lembap dan lanskap Nusantara.
          </p>
        </div>

        {/* Desktop Split View: Interactive Hover Rows (Left) & Dynamic Preview Display (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Left Column: Numbered Rows (col 1-7) */}
          <div className="lg:col-span-7 flex flex-col">
            {projects.map((project, idx) => {
              const isHovered = activeProject?.id === project.id;
              const typeLabel = projectTypeLabels[project.type]?.id || project.type;

              return (
                <Link
                  key={project.id}
                  href={`/karya/${project.slug}`}
                  onMouseEnter={() => setActiveProject(project)}
                  onFocus={() => setActiveProject(project)}
                  className={cn(
                    "group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-2 border-b border-ink-hairline transition-all duration-200 focus-visible:outline focus-visible:outline-2",
                    isHovered ? "bg-bone/40 sm:translate-x-1" : "hover:bg-bone/20"
                  )}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <IndexLabel index={idx + 1} />
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-ink group-hover:text-black">
                        {project.title}
                      </span>
                      <span className="font-mono text-mono text-graphite">
                        {project.city} &bull; {typeLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0">
                    <div className="flex items-center gap-3">
                      {project.status === "dibangun" ? (
                        <Badge variant="clay" withDot>
                          Pembangunan
                        </Badge>
                      ) : (
                        <span className="font-mono text-mono text-stone">
                          {project.year}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-label uppercase tracking-wider text-ink">
                      <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                        Detail
                      </span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Bottom Link to Full Portfolio */}
            <div className="pt-10 flex items-center justify-between">
              <span className="font-mono text-mono text-stone">
                Menampilkan {projects.length} proyek unggulan
              </span>
              <Pill href="/karya" variant="outline" showArrow>
                Lihat Seluruh Karya
              </Pill>
            </div>
          </div>

          {/* Right Column: Visual Preview Panel (col 8-12, sticky on desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone border border-ink-hairline">
                {activeProject?.images[0]?.path ? (
                  <Image
                    key={activeProject.id}
                    src={activeProject.images[0].path}
                    alt={activeProject.images[0].altId || activeProject.title}
                    fill
                    sizes="40vw"
                    className="object-cover object-center transition-all duration-500 will-change-transform"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-mono text-stone">
                    Pratinjau Foto
                  </div>
                )}
              </div>

              {activeProject && (
                <div className="flex flex-col gap-1.5 pt-2">
                  <div className="flex items-center justify-between font-mono text-mono text-stone">
                    <span>{activeProject.city}</span>
                    <span>{activeProject.year}</span>
                  </div>
                  <p className="font-sans text-sm text-graphite line-clamp-2 leading-relaxed">
                    {activeProject.summaryId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

