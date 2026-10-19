"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus, Trash2, Check } from "lucide-react";
import { Project, ProjectStatus, projectStatusLabels, projectTypeLabels } from "@/domain/project";
import { deleteProjectAction } from "@/actions/admin-actions";
import { Badge } from "@/components/ui/badge";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

interface ProjectTableProps {
  initialProjects: Project[];
}

export function ProjectTable({ initialProjects }: ProjectTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedStatus, setSelectedStatus] = useState<string>("semua");
  const [notification, setNotification] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Hapus karya arsitektur "${title}" secara permanen?`)) return;

    setProjects((prev) => prev.filter((p) => p.id !== id));

    startTransition(async () => {
      const res = await deleteProjectAction(id);
      if (res.success) {
        showNotification(res.message || `Proyek "${title}" telah dihapus.`);
      } else {
        showNotification(res.error || "Gagal menghapus proyek.");
      }
    });
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedStatus === "semua") return true;
    return p.status === selectedStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-bone border border-ink text-ink font-mono text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check size={14} />
            {notification}
          </span>
          <button
            onClick={() => setNotification(null)}
            className="text-stone hover:text-ink font-mono text-label uppercase"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Control Header: Filters and New Project Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink-hairline">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar font-mono text-label uppercase">
          <button
            type="button"
            onClick={() => setSelectedStatus("semua")}
            className={cn(
              "px-3 py-1.5 border transition-colors whitespace-nowrap",
              selectedStatus === "semua"
                ? "bg-ink text-paper border-ink"
                : "bg-paper text-stone border-ink-hairline hover:border-ink"
            )}
          >
            Semua ({projects.length})
          </button>
          {(["selesai", "dibangun", "rancangan"] as ProjectStatus[]).map((st) => {
            const count = projects.filter((p) => p.status === st).length;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={cn(
                  "px-3 py-1.5 border transition-colors whitespace-nowrap",
                  selectedStatus === st
                    ? "bg-ink text-paper border-ink"
                    : "bg-paper text-stone border-ink-hairline hover:border-ink"
                )}
              >
                {projectStatusLabels[st]?.id} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Pill href="/admin/proyek/baru" variant="ink">
            <Plus size={14} strokeWidth={1.5} className="mr-1" />
            Tambah Proyek Baru
          </Pill>
        </div>
      </div>

      {/* Projects Table */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-ink-hairline bg-bone/20 flex flex-col items-center justify-center gap-2">
          <p className="font-sans text-base text-stone">
            Belum ada karya arsitektur dalam kategori ini.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-ink-hairline">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-bone/60 border-b border-ink-hairline font-mono text-label uppercase text-stone select-none">
              <tr>
                <th className="py-3 px-4">Karya</th>
                <th className="py-3 px-4">Tipologi</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4">Tahun</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Dimensi</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-hairline bg-paper">
              {filteredProjects.map((proj) => {
                const cover =
                  proj.images.find((img) => img.isCover)?.path ||
                  proj.images[0]?.path ||
                  "";

                return (
                  <tr
                    key={proj.id}
                    className="hover:bg-bone/20 transition-colors"
                  >
                    {/* Visual & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {cover ? (
                          <div className="relative w-14 h-10 flex-shrink-0 bg-bone border border-ink-hairline overflow-hidden">
                            <Image
                              src={cover}
                              alt={proj.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-10 flex-shrink-0 bg-bone border border-ink-hairline" />
                        )}

                        <div className="flex flex-col">
                          <span className="font-medium text-ink flex items-center gap-2">
                            {proj.title}
                            {proj.isFeatured && (
                              <span className="font-mono text-[9px] uppercase px-1 py-0.2 bg-ink text-paper">
                                Unggulan
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-xs text-stone">
                            /{proj.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Tipologi */}
                    <td className="py-3 px-4 text-graphite text-xs">
                      {projectTypeLabels[proj.type]?.id}
                    </td>

                    {/* Lokasi */}
                    <td className="py-3 px-4 text-graphite text-xs">
                      {proj.city}
                    </td>

                    {/* Tahun */}
                    <td className="py-3 px-4 font-mono text-xs text-stone">
                      {proj.year}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {proj.status === "dibangun" ? (
                        <Badge variant="clay" withDot>
                          {projectStatusLabels[proj.status]?.id}
                        </Badge>
                      ) : (
                        <span className="font-mono text-xs text-stone">
                          {projectStatusLabels[proj.status]?.id}
                        </span>
                      )}
                    </td>

                    {/* Dimensi */}
                    <td className="py-3 px-4 font-mono text-xs text-stone">
                      {proj.floorAreaM2 ? `${proj.floorAreaM2} m²` : "—"}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-3 font-mono text-xs">
                        <Link
                          href={`/karya/${proj.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-0.5 text-stone hover:text-ink underline"
                        >
                          <span>Buka</span>
                          <ArrowUpRight size={11} strokeWidth={1.5} />
                        </Link>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="text-stone hover:text-red-700 transition-colors"
                          title="Hapus proyek"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

