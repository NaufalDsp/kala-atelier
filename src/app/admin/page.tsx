import Link from "next/link";
import { ArrowUpRight, FolderPlus, Inbox, Settings } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Badge } from "@/components/ui/badge";
import { Pill } from "@/components/ui/pill";
import { projectRepository } from "@/lib/repositories";
import { projectTypeLabels, projectStatusLabels } from "@/domain/project";

export default async function AdminDashboardPage() {
  const projects = await projectRepository.getAllProjects();
  const featured = projects.filter((p) => p.isFeatured);
  const underConstruction = projects.filter((p) => p.status === "dibangun");

  const isSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <Container className="flex flex-col gap-12">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-ink-hairline">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <IndexLabel index="01" />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Ringkasan Operasional
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            Pusat Kendali Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Pill href="/admin/proyek/baru" variant="ink" showArrow>
            Tambah Proyek
          </Pill>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-bone/30 border border-ink-hairline flex flex-col justify-between gap-4">
          <span className="font-mono text-label uppercase tracking-wider text-stone">
            Total Proyek Portofolio
          </span>
          <div className="font-sans text-4xl font-medium text-ink">
            {projects.length}
          </div>
          <span className="font-mono text-xs text-graphite">
            {featured.length} karya ditandai unggulan
          </span>
        </div>

        <div className="p-6 bg-bone/30 border border-ink-hairline flex flex-col justify-between gap-4">
          <span className="font-mono text-label uppercase tracking-wider text-clay">
            Proyek Konstruksi Aktif
          </span>
          <div className="font-sans text-4xl font-medium text-clay">
            {underConstruction.length}
          </div>
          <span className="font-mono text-xs text-graphite">
            Linimasa progres aktif di situs
          </span>
        </div>

        <div className="p-6 bg-bone/30 border border-ink-hairline flex flex-col justify-between gap-4">
          <span className="font-mono text-label uppercase tracking-wider text-stone">
            Penyedia Data
          </span>
          <div className="font-sans text-2xl font-medium text-ink">
            {isSupabase ? "Supabase Postgres" : "Mock Lokal"}
          </div>
          <span className="font-mono text-xs text-stone">
            {isSupabase ? "Kueri langsung ke database" : "Data dari src/data/projects.ts"}
          </span>
        </div>

        <div className="p-6 bg-bone/30 border border-ink-hairline flex flex-col justify-between gap-4">
          <span className="font-mono text-label uppercase tracking-wider text-stone">
            Keamanan Akses
          </span>
          <div className="font-sans text-2xl font-medium text-ink">
            Allowlist Admin
          </div>
          <span className="font-mono text-xs text-stone">
            Row Level Security Aktif
          </span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link
          href="/admin/proyek"
          className="group p-6 bg-paper border border-ink-hairline hover:border-ink hover:bg-bone/20 transition-all flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <FolderPlus size={20} strokeWidth={1.5} className="text-ink" />
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-stone group-hover:text-ink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-lg font-medium text-ink">
              Kelola Proyek Arsitektur
            </h3>
            <p className="font-sans text-xs text-graphite">
              Perbarui judul, foto, spesifikasi material, dan narasi perancangan.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/enquiry"
          className="group p-6 bg-paper border border-ink-hairline hover:border-ink hover:bg-bone/20 transition-all flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <Inbox size={20} strokeWidth={1.5} className="text-ink" />
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-stone group-hover:text-ink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-lg font-medium text-ink">
              Kotak Masuk Konsultasi
            </h3>
            <p className="font-sans text-xs text-graphite">
              Pantau formulir enquiry calon klien, perbarui status, dan tindak lanjuti.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/pengaturan"
          className="group p-6 bg-paper border border-ink-hairline hover:border-ink hover:bg-bone/20 transition-all flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <Settings size={20} strokeWidth={1.5} className="text-ink" />
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-stone group-hover:text-ink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-lg font-medium text-ink">
              Pengaturan Situs Studio
            </h3>
            <p className="font-sans text-xs text-graphite">
              Atur jam kerja WIB, kontak studio, dan catatan transparansi kapasitas.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="flex flex-col gap-4 pt-6 border-t border-ink-hairline">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xl font-medium text-ink">
            Karya Portofolio Terdaftar
          </h2>
          <Link
            href="/admin/proyek"
            className="font-mono text-label uppercase tracking-wider text-graphite hover:text-ink underline"
          >
            Lihat Semua ({projects.length})
          </Link>
        </div>

        <div className="overflow-x-auto border border-ink-hairline">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-bone/50 border-b border-ink-hairline font-mono text-label uppercase text-stone">
              <tr>
                <th className="py-3 px-4">Indeks</th>
                <th className="py-3 px-4">Nama Proyek</th>
                <th className="py-3 px-4">Tipologi</th>
                <th className="py-3 px-4">Lokasi</th>
                <th className="py-3 px-4">Tahun</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-hairline bg-paper">
              {projects.map((proj, idx) => (
                <tr key={proj.id} className="hover:bg-bone/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-mono text-stone">
                    (0{idx + 1})
                  </td>
                  <td className="py-3.5 px-4 font-medium text-ink">
                    <div className="flex items-center gap-2">
                      <span>{proj.title}</span>
                      {proj.isFeatured && (
                        <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-ink text-paper">
                          Unggulan
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-graphite">
                    {projectTypeLabels[proj.type]?.id}
                  </td>
                  <td className="py-3.5 px-4 text-graphite">{proj.city}</td>
                  <td className="py-3.5 px-4 font-mono text-mono text-stone">
                    {proj.year}
                  </td>
                  <td className="py-3.5 px-4">
                    {proj.status === "dibangun" ? (
                      <Badge variant="clay" withDot>
                        {projectStatusLabels[proj.status]?.id}
                      </Badge>
                    ) : (
                      <span className="font-mono text-mono text-stone">
                        {projectStatusLabels[proj.status]?.id}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs">
                    <Link
                      href={`/karya/${proj.slug}`}
                      target="_blank"
                      className="text-stone hover:text-ink underline"
                    >
                      Buka
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

