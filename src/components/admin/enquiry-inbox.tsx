"use client";

import { useState, useTransition } from "react";
import {
  Download,
  Search,
  Trash2,
  ExternalLink,
  MessageSquare,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Enquiry,
  EnquiryStatus,
  budgetLabels,
  builderStatusLabels,
  sourceLabels,
  ENQUIRY_STATUSES,
} from "@/domain/enquiry";
import { updateEnquiryStatusAction, deleteEnquiryAction } from "@/actions/admin-actions";
import { cn } from "@/lib/utils";

interface EnquiryInboxProps {
  initialEnquiries: Enquiry[];
}

const statusDisplay: Record<EnquiryStatus, { label: string; badgeClass: string }> = {
  baru: {
    label: "Baru",
    badgeClass: "bg-clay text-paper border-clay",
  },
  dihubungi: {
    label: "Dihubungi",
    badgeClass: "bg-bone text-ink border-stone/40",
  },
  cocok: {
    label: "Cocok",
    badgeClass: "bg-ink text-paper border-ink",
  },
  tidak_cocok: {
    label: "Tidak Cocok",
    badgeClass: "bg-bone text-stone border-ink-hairline line-through",
  },
  arsip: {
    label: "Diarsipkan",
    badgeClass: "bg-bone text-stone border-ink-hairline",
  },
};

export function EnquiryInbox({ initialEnquiries }: EnquiryInboxProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedStatus, setSelectedStatus] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    // Optimistic local update
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );

    startTransition(async () => {
      const res = await updateEnquiryStatusAction(id, newStatus);
      if (res.success) {
        showNotification(res.message || "Status diperbarui");
      } else {
        showNotification(res.error || "Gagal memperbarui status");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Hapus catatan konsultasi ini secara permanen?")) return;

    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(null);

    startTransition(async () => {
      const res = await deleteEnquiryAction(id);
      if (res.success) {
        showNotification(res.message || "Konsultasi dihapus");
      } else {
        showNotification(res.error || "Gagal menghapus");
      }
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Tanggal",
      "Nama Klien",
      "Email",
      "WhatsApp",
      "Tipologi",
      "Lokasi",
      "Anggaran",
      "Linimasa",
      "Status",
      "Brief",
    ];

    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toLocaleDateString("id-ID")}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone || ""}"`,
      `"${e.projectTypes.join(", ")}"`,
      `"${e.location.replace(/"/g, '""')}"`,
      `"${e.budget ? budgetLabels[e.budget] || e.budget : ""}"`,
      `"${e.timeline || ""}"`,
      `"${e.status}"`,
      `"${(e.brief || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `kala-atelier-enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Berkas CSV berhasil diunduh.");
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus =
      selectedStatus === "semua" || e.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      (e.phone && e.phone.includes(q));

    return matchesStatus && matchesQuery;
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

      {/* Controls Bar: Search, Status Tabs, and CSV Export */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-ink-hairline">
        {/* Status Filter Tabs */}
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
            Semua ({enquiries.length})
          </button>
          {ENQUIRY_STATUSES.map((st) => {
            const count = enquiries.filter((e) => e.status === st).length;
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
                {statusDisplay[st]?.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Export Actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, lokasi..."
              className="w-full bg-paper border border-ink-hairline pl-8 pr-3 py-1.5 font-sans text-xs text-ink placeholder:text-stone focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bone border border-ink-hairline hover:border-ink font-mono text-label uppercase tracking-wider text-ink transition-colors"
          >
            <Download size={13} strokeWidth={1.5} />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Enquiries Table */}
      {filteredEnquiries.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-ink-hairline bg-bone/20 flex flex-col items-center justify-center gap-2">
          <p className="font-sans text-base text-stone">
            Tidak ada data formulir konsultasi yang sesuai filter.
          </p>
          <span className="font-mono text-xs text-stone">
            Gunakan tab status lain atau periksa kata kunci pencarian.
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto border border-ink-hairline">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-bone/60 border-b border-ink-hairline font-mono text-label uppercase text-stone select-none">
              <tr>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Klien & Kontak</th>
                <th className="py-3 px-4">Tipologi</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4">Anggaran</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-hairline bg-paper">
              {filteredEnquiries.map((enq) => {
                const isExpanded = expandedId === enq.id;
                const formattedDate = new Date(enq.createdAt).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                // WhatsApp deep link formatting
                const cleanPhone = enq.phone
                  ? enq.phone.replace(/^0/, "62").replace(/[^0-9]/g, "")
                  : null;
                const waMessage = encodeURIComponent(
                  `Halo Bapak/Ibu ${enq.name}, salam dari Kala Atelier. Kami telah meninjau formulir konsultasi perancangan Anda untuk lahan di ${enq.location}. Kapan kiranya ada waktu untuk sesi perkenalan daring atau temu studio?`
                );
                const waLink = cleanPhone
                  ? `https://wa.me/${cleanPhone}?text=${waMessage}`
                  : null;

                return (
                  <tr
                    key={enq.id}
                    className={cn(
                      "group transition-colors",
                      isExpanded ? "bg-bone/30" : "hover:bg-bone/15"
                    )}
                  >
                    <td
                      colSpan={7}
                      className="p-0 border-b border-ink-hairline last:border-b-0"
                    >
                      {/* Main Table Row */}
                      <div className="grid grid-cols-7 items-center p-4 gap-4 text-xs">
                        {/* Tanggal */}
                        <div className="font-mono text-stone">{formattedDate}</div>

                        {/* Klien & Kontak */}
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-ink text-sm">
                            {enq.name}
                          </span>
                          <span className="text-stone truncate max-w-[180px]">
                            {enq.email}
                          </span>
                          {enq.phone && (
                            <span className="font-mono text-graphite">
                              {enq.phone}
                            </span>
                          )}
                        </div>

                        {/* Tipologi */}
                        <div className="capitalize text-graphite">
                          {enq.projectTypes.join(", ")}
                        </div>

                        {/* Lokasi */}
                        <div className="text-graphite line-clamp-2">
                          {enq.location}
                        </div>

                        {/* Anggaran */}
                        <div className="font-mono text-stone">
                          {enq.budget ? budgetLabels[enq.budget] || enq.budget : "—"}
                        </div>

                        {/* Status Dropdown */}
                        <div>
                          <select
                            value={enq.status}
                            disabled={isPending}
                            onChange={(e) =>
                              handleStatusChange(
                                enq.id,
                                e.target.value as EnquiryStatus
                              )
                            }
                            className={cn(
                              "font-mono text-label uppercase px-2 py-1 border focus:outline-none cursor-pointer transition-colors",
                              statusDisplay[enq.status]?.badgeClass
                            )}
                          >
                            {ENQUIRY_STATUSES.map((st) => (
                              <option
                                key={st}
                                value={st}
                                className="bg-paper text-ink font-sans"
                              >
                                {statusDisplay[st]?.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Rincian Toggle */}
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : enq.id)
                            }
                            className="inline-flex items-center gap-1 font-mono text-label uppercase text-graphite hover:text-ink px-2 py-1 border border-ink-hairline hover:border-ink transition-colors"
                          >
                            <span>{isExpanded ? "Tutup" : "Buka"}</span>
                            {isExpanded ? (
                              <ChevronUp size={12} />
                            ) : (
                              <ChevronDown size={12} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Detail View */}
                      {isExpanded && (
                        <div className="border-t border-ink-hairline bg-paper p-6 flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Brief Section */}
                            <div className="md:col-span-2 flex flex-col gap-2">
                              <span className="font-mono text-label uppercase text-stone tracking-wider">
                                Narasi & Kebutuhan Ruang (Brief Klien)
                              </span>
                              <p className="font-sans text-sm text-ink leading-relaxed whitespace-pre-wrap bg-bone/30 p-4 border border-ink-hairline">
                                {enq.brief || "Tidak ada catatan narasi spesifik."}
                              </p>
                            </div>

                            {/* Supplementary Metadata */}
                            <div className="flex flex-col gap-4 bg-bone/20 p-4 border border-ink-hairline">
                              <div>
                                <span className="font-mono text-[10px] uppercase text-stone block">
                                  Linimasa Diharapkan
                                </span>
                                <span className="font-sans text-xs text-ink font-medium">
                                  {enq.timeline || "Belum ditentukan"}
                                </span>
                              </div>

                              <div>
                                <span className="font-mono text-[10px] uppercase text-stone block">
                                  Kesiapan Kontraktor
                                </span>
                                <span className="font-sans text-xs text-ink">
                                  {enq.hasBuilder
                                    ? builderStatusLabels[enq.hasBuilder]
                                    : "Belum ditentukan"}
                                </span>
                                {enq.builderNote && (
                                  <p className="font-sans text-[11px] text-graphite mt-1 italic">
                                    &ldquo;{enq.builderNote}&rdquo;
                                  </p>
                                )}
                              </div>

                              <div>
                                <span className="font-mono text-[10px] uppercase text-stone block">
                                  Sumber Referensi
                                </span>
                                <span className="font-sans text-xs text-ink">
                                  {enq.source
                                    ? sourceLabels[enq.source] || enq.source
                                    : "Langsung"}
                                </span>
                              </div>

                              {enq.refProject && (
                                <div>
                                  <span className="font-mono text-[10px] uppercase text-stone block">
                                    Referensi Karya Studio
                                  </span>
                                  <span className="font-mono text-xs text-clay">
                                    /{enq.refProject}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick Follow-up Action Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink-hairline">
                            <div className="flex items-center gap-3">
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper font-mono text-label uppercase tracking-wider hover:bg-clay transition-colors"
                                >
                                  <MessageSquare size={13} strokeWidth={1.5} />
                                  <span>Tindak Lanjuti di WhatsApp</span>
                                  <ExternalLink size={12} strokeWidth={1.5} />
                                </a>
                              )}

                              <a
                                href={`mailto:${enq.email}?subject=${encodeURIComponent(
                                  `Kala Atelier — Tanggapan Konsultasi Arsitektur (${enq.name})`
                                )}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-ink text-ink font-mono text-label uppercase tracking-wider hover:bg-bone transition-colors"
                              >
                                <span>Balas Email</span>
                              </a>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDelete(enq.id)}
                              className="inline-flex items-center gap-1 font-mono text-label uppercase text-stone hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                              <span>Hapus Konsultasi</span>
                            </button>
                          </div>
                        </div>
                      )}
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

