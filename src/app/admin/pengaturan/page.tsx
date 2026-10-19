"use client";

import { useState, useTransition } from "react";
import { Save, Check, Building2, Clock, Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { updateStudioSettingsAction } from "@/actions/admin-actions";

export default function AdminSettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [notification, setNotification] = useState<string | null>(null);

  // Studio Settings State
  const [studioName, setStudioName] = useState("Kala Atelier");
  const [tagline, setTagline] = useState(
    "Arsitektur Kontekstual & Tropis Nusantara"
  );
  const [address, setAddress] = useState(
    "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190"
  );
  const [operatingHours, setOperatingHours] = useState(
    "Senin – Jumat, 09:00 – 18:00 WIB"
  );
  const [email, setEmail] = useState("halo@kalaatelier.id");
  const [whatsapp, setWhatsapp] = useState("+62 812-3456-7890");
  const [capacityNotice, setCapacityNotice] = useState(
    "Menerima 2 proyek perancangan baru untuk kuartal ini guna menjaga intensitas supervisi lapangan."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateStudioSettingsAction({
        studioName,
        tagline,
        address,
        operatingHours,
        email,
        whatsapp,
        capacityNotice,
      });

      if (res.success) {
        setNotification(res.message || "Pengaturan berhasil diperbarui.");
        setTimeout(() => setNotification(null), 3500);
      } else {
        setNotification(res.error || "Gagal memperbarui pengaturan.");
      }
    });
  };

  return (
    <Container className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink-hairline">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <IndexLabel index="04" />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Konfigurasi Sistem
            </span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            Pengaturan Situs Studio
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-paper hover:bg-clay disabled:opacity-50 font-mono text-label uppercase tracking-widest transition-colors select-none"
        >
          <Save size={13} strokeWidth={1.5} />
          <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>

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

      {/* Settings Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Identitas Studio */}
        <div className="p-6 bg-paper border border-ink-hairline flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-3 border-b border-ink-hairline">
            <Building2 size={16} strokeWidth={1.5} className="text-ink" />
            <h2 className="font-sans text-base font-medium text-ink">
              Identitas & Entitas Studio
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Nama Studio
            </label>
            <input
              type="text"
              required
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="bg-paper border border-ink-hairline px-3.5 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Tagline Studio
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="bg-paper border border-ink-hairline px-3.5 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Alamat Fisik Kantor
            </label>
            <textarea
              rows={2}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-paper border border-ink-hairline p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Jam Kerja & Kontak */}
        <div className="p-6 bg-paper border border-ink-hairline flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-3 border-b border-ink-hairline">
            <Clock size={16} strokeWidth={1.5} className="text-ink" />
            <h2 className="font-sans text-base font-medium text-ink">
              Operasional & Kontak Resmi
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider">
              Jam Operasional (WIB)
            </label>
            <input
              type="text"
              required
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              className="bg-paper border border-ink-hairline px-3.5 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
            <span className="font-mono text-[10px] text-stone">
              Ditampilkan pada indikator status waktu nyata di footer.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider flex items-center gap-1.5">
              <Mail size={12} strokeWidth={1.5} />
              Email Resmi Studio
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-paper border border-ink-hairline px-3.5 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-label uppercase text-stone tracking-wider flex items-center gap-1.5">
              <MessageSquare size={12} strokeWidth={1.5} />
              Nomor WhatsApp Studio
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="bg-paper border border-ink-hairline px-3.5 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Transparansi Kapasitas */}
        <div className="lg:col-span-2 p-6 bg-bone/30 border border-ink-hairline flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-sans text-base font-medium text-ink">
              Transparansi Kapasitas & Penerimaan Proyek
            </h2>
            <p className="font-sans text-xs text-graphite">
              Pernyataan ini tampil pada awal formulir konsultasi perancangan untuk menetapkan ekspektasi jadwal klien.
            </p>
          </div>

          <textarea
            rows={3}
            required
            value={capacityNotice}
            onChange={(e) => setCapacityNotice(e.target.value)}
            className="bg-paper border border-ink-hairline p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
          />
        </div>
      </form>
    </Container>
  );
}

