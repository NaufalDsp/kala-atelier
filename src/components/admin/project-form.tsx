"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Check } from "lucide-react";
import {
  ProjectType,
  ProjectStatus,
  PROJECT_TYPES,
  PROJECT_STATUSES,
  projectTypeLabels,
  projectStatusLabels,
} from "@/domain/project";
import { createProjectAction } from "@/actions/admin-actions";

export function ProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [city, setCity] = useState("");
  const [type, setType] = useState<ProjectType>(PROJECT_TYPES[0]);
  const [status, setStatus] = useState<ProjectStatus>(PROJECT_STATUSES[0]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [landAreaM2, setLandAreaM2] = useState<string>("");
  const [floorAreaM2, setFloorAreaM2] = useState<string>("");
  const [materials, setMaterials] = useState("Bata Terakota Press, Beton Ekspos, Kayu Ulin Daur Ulang");
  const [climateNotes, setClimateNotes] = useState(
    "Orientasi massa bangunan utara-selatan dengan tritisan peneduh 2.4 meter dan bukaan silang alami."
  );
  const [summaryId, setSummaryId] = useState("");
  const [bodyId, setBodyId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
  );

  // Auto-slug generation from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !city.trim() || !summaryId.trim()) {
      setNotification("Harap lengkapi judul, slug, lokasi, dan ringkasan karya.");
      return;
    }

    const mainMaterials = materials
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    startTransition(async () => {
      const res = await createProjectAction({
        title,
        slug,
        year: Number(year),
        city,
        type,
        status,
        summaryId,
        bodyId: bodyId.trim() || undefined,
        landAreaM2: landAreaM2 ? Number(landAreaM2) : undefined,
        floorAreaM2: floorAreaM2 ? Number(floorAreaM2) : undefined,
        mainMaterials,
        climateNotesId: climateNotes.trim() || undefined,
        isFeatured,
        coverImageUrl: coverImageUrl.trim() || undefined,
      });

      if (res.success) {
        setNotification(res.message || "Proyek berhasil disimpan.");
        setTimeout(() => {
          router.push("/admin/proyek");
        }, 1500);
      } else {
        setNotification(res.error || "Gagal menyimpan karya.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-bone border border-ink text-ink font-mono text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check size={14} />
            {notification}
          </span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-stone hover:text-ink font-mono text-label uppercase"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ink-hairline">
        <Link
          href="/admin/proyek"
          className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-wider text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          <span>Kembali ke Daftar</span>
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper hover:bg-clay disabled:opacity-50 font-mono text-label uppercase tracking-widest transition-colors select-none"
        >
          <Save size={13} strokeWidth={1.5} />
          <span>{isPending ? "Menyimpan..." : "Simpan Karya"}</span>
        </button>
      </div>

      {/* Form Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Metadata */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Judul Karya Arsitektur *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Contoh: Omah Selasar"
              className="bg-paper border border-ink-hairline px-3.5 py-2.5 font-sans text-base text-ink focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Slug URL *
              </label>
              <div className="flex items-center border border-ink-hairline bg-bone/30">
                <span className="font-mono text-xs text-stone px-2">/karya/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="omah-selasar"
                  className="w-full bg-transparent py-2 pr-2 font-mono text-xs text-ink focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Lokasi Kota *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Sentul Selatan, Bogor"
                className="bg-paper border border-ink-hairline px-3 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors"
              />
            </div>
          </div>

          {/* Typology, Status, Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Tipologi
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ProjectType)}
                className="bg-paper border border-ink-hairline px-3 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink cursor-pointer"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {projectTypeLabels[t]?.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Status Pengerjaan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="bg-paper border border-ink-hairline px-3 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink cursor-pointer"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {projectStatusLabels[s]?.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Tahun
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-paper border border-ink-hairline px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-ink"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Luas Lahan (m²)
              </label>
              <input
                type="number"
                value={landAreaM2}
                onChange={(e) => setLandAreaM2(e.target.value)}
                placeholder="Contoh: 650"
                className="bg-paper border border-ink-hairline px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-label uppercase text-stone tracking-wider">
                Luas Bangunan (m²)
              </label>
              <input
                type="number"
                value={floorAreaM2}
                onChange={(e) => setFloorAreaM2(e.target.value)}
                placeholder="Contoh: 420"
                className="bg-paper border border-ink-hairline px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-ink"
              />
            </div>
          </div>

          {/* Narration: Summary & Body */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Ringkasan Gagasan Perancangan (Summary) *
            </label>
            <textarea
              required
              rows={3}
              value={summaryId}
              onChange={(e) => setSummaryId(e.target.value)}
              placeholder="Deskripsi singkat 1-2 paragraf mengenai inti pendekatan arsitektural..."
              className="bg-paper border border-ink-hairline p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Narasi Perancangan Lengkap (Markdown)
            </label>
            <textarea
              rows={6}
              value={bodyId}
              onChange={(e) => setBodyId(e.target.value)}
              placeholder="Eksplorasi tektonika, zonasi ruang, orientasi cahaya, dan dialog dengan tapak..."
              className="bg-paper border border-ink-hairline p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Visual, Materials & Climate Specs */}
        <div className="flex flex-col gap-6">
          {/* Featured Toggle */}
          <div className="p-4 bg-bone/30 border border-ink-hairline flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-sm font-medium text-ink">
                Karya Unggulan Beranda
              </span>
              <span className="font-sans text-xs text-graphite">
                Tampilkan di kurasi beranda utama studio.
              </span>
            </div>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-ink cursor-pointer"
            />
          </div>

          {/* Cover Image URL */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              URL Foto Sampul (Cover Image)
            </label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="bg-paper border border-ink-hairline px-3 py-2 font-mono text-xs text-ink focus:outline-none focus:border-ink"
            />
            <span className="font-mono text-[10px] text-stone">
              Resolusi minimal 1920x1080 untuk hasil visual tajam.
            </span>
          </div>

          {/* Materials */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Material Utama (Dipisah Koma)
            </label>
            <textarea
              rows={3}
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="bg-paper border border-ink-hairline p-3 font-sans text-xs text-ink focus:outline-none focus:border-ink"
            />
          </div>

          {/* Climate Notes */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Strategi Iklim Tropis
            </label>
            <textarea
              rows={4}
              value={climateNotes}
              onChange={(e) => setClimateNotes(e.target.value)}
              className="bg-paper border border-ink-hairline p-3 font-sans text-xs text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
