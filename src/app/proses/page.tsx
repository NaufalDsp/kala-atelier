import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Pill } from "@/components/ui/pill";

export const metadata: Metadata = {
  title: "Proses Kerja",
  description:
    "Metodologi 6 tahap perancangan arsitektur dan interior transparan di Kala Atelier.",
};

const DETAILED_STAGES = [
  {
    step: 1,
    title: "Sketsa Desain & Studi Kontekstual Tapak",
    duration: "3 — 4 Minggu",
    desc: "Tahap awal penyelidikan. Kami memetakan orientasi matahari terhadap tapak, mengukur pola kecepatan angin mikro, kontur tanah, serta mendalami gaya hidup, rutinitas, dan aspirasi spasial penghuni.",
    deliverable: [
      "Buku konsep desain awal (Schematic Design Book)",
      "Diagram analisis iklim mikro & simulasi pencahayaan matahari",
      "Alternatif sketsa denah lantai (2 opsi arah gubahan)",
      "Model massa 3D digital konseptual",
    ],
    clientInput:
      "Informasi sertifikat lahan, garis sempadan (jika ada), daftar kebutuhan ruang, serta preferensi gaya hidup keluarga.",
  },
  {
    step: 2,
    title: "Pengembangan Desain & Pemilihan Material Taktil",
    duration: "4 — 6 Minggu",
    desc: "Pematangan opsi denah terpilih menjadi desain arsitektural utuh. Pada tahap ini, kami memilih palet material fisik: jenis kayu, bata bakar lokal, batu alam, dan tekstur plesteran semen.",
    deliverable: [
      "Gambar denah, tampak bangunan, dan potongan prinsip presisi",
      "Visualisasi render 3D fotorealistis eksterior & ruang utama",
      "Papan sampel material fisik (Material Moodboard)",
      "Perkiraan Rencana Anggaran Biaya (RAB) tahap skematik",
    ],
    clientInput:
      "Diskusi penyesuaian denah dan persetujuan pemilihan sampel material fisik.",
  },
  {
    step: 3,
    title: "Pengajuan PBG & Kepatuhan Tata Kota",
    duration: "4 — 8 Minggu (Bergantung Pemda)",
    desc: "Penyusunan berkas teknis perizinan Persetujuan Bangunan Gedung (PBG) untuk memastikan proyek mematuhi peraturan Koefisien Dasar Bangunan (KDB), Koefisien Lantai Bangunan (KLB), dan Koefisien Daerah Hijau (KDH).",
    deliverable: [
      "Format gambar teknis standar pengajuan perizinan PBG",
      "Perhitungan ketetapan KDB, KLB, dan KDH resmi",
      "Surat Keterangan Rencana Kota (KRK) terverifikasi",
    ],
    clientInput:
      "Dokumen legalitas kepemilikan tanah dan identitas pemohon izin.",
  },
  {
    step: 4,
    title: "Perancangan Detail Arsitektur & Interior",
    duration: "4 — 5 Minggu",
    desc: "Desain menyeluruh untuk elemen interior tanam (*built-in furniture*), pola lantai, kusen jendela kedap air hujan tropis, serta penataan lampu buatan (*architectural lighting*) untuk suasana malam hari.",
    deliverable: [
      "Gambar detail lemari, dapur, dan panel dinding skala 1:20 & 1:10",
      "Jadwal spesifikasi titik lampu, saklar, dan suhu warna Kelvin",
      "Spesifikasi sanitair, kran, dan hardware pintu",
    ],
    clientInput:
      "Pemilihan perabot lepas (loose furniture) dan peralatan elektronik utama.",
  },
  {
    step: 5,
    title: "Gambar Kerja Konstruksi (DED) & Tender Kontraktor",
    duration: "5 — 7 Minggu",
    desc: "Penyusunan bundel dokumen teknis konstruksi setebal ratusan lembar yang menjadi acuan mutlak kontraktor. Koordinasi terpadu dengan konsultan struktur beton bertulang dan instalasi MEP.",
    deliverable: [
      "Bundel Gambar Kerja Arsitektur, Struktur, & MEP Lengkap",
      "Rencana Kerja dan Syarat-Syarat Teknis (RKS)",
      "Bill of Quantities (BoQ) kosong untuk proses tender kontraktor",
      "Analisis perbandingan penawaran kontraktor pelaksana",
    ],
    clientInput:
      "Penentuan kontraktor terpilih bersama prinsipal arsitek.",
  },
  {
    step: 6,
    title: "Pengawasan Berkala Konstruksi Lapangan",
    duration: "Sesuai Jadwal Fisik Kontraktor (± 8 — 14 Bulan)",
    desc: "Kunjungan rutin ke lokasi pembangunan oleh tim prinsipal Kala Atelier untuk menginspeksi mutu pekerjaan struktur, ketepatan sambungan material, dan memastikan tidak ada deviasi dari gambar kerja.",
    deliverable: [
      "Laporan tertulis kunjungan berkala lapangan",
      "Lembar instruksi perbaikan teknis (*site instruction*)",
      "Persetujuan sampel material di tapak (*mock-up approval*)",
    ],
    clientInput:
      "Pertemuan evaluasi bulanan berkala di lokasi proyek bersama kontraktor.",
  },
];

export default function ProsesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="flex flex-col gap-20">
          {/* Page Editorial Header */}
          <section className="flex flex-col gap-6 max-w-4xl pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="02" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Metodologi Kerja
              </span>
            </div>

            <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
              Proses Perancangan
            </h1>

            <p className="font-sans text-lead text-graphite max-w-2xl leading-relaxed text-pretty">
              Arsitektur berkualitas membutuhkan ketelitian, ketenangan, dan kesepahaman antara klien dan arsitek. Kami membagi perjalanan perancangan ke dalam 6 fase terukur.
            </p>
          </section>

          {/* Detailed Stages List */}
          <section className="flex flex-col border-t border-ink-hairline">
            {DETAILED_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="py-14 border-b border-ink-hairline grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Step Index & Title (col 1-4) */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <IndexLabel index={stage.step} total={6} />
                    <span className="font-mono text-mono text-stone uppercase">
                      Durasi: {stage.duration}
                    </span>
                  </div>

                  <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink leading-tight">
                    {stage.title}
                  </h2>
                </div>

                {/* Narrative & Deliverables (col 5-12) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <p className="font-sans text-body text-graphite leading-relaxed max-w-[62ch]">
                    {stage.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ink-hairline bg-bone/20 p-6">
                    {/* Deliverable Outputs */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-label uppercase tracking-wider text-ink font-semibold">
                        Keluaran Dokumen (Deliverable)
                      </span>
                      <ul className="flex flex-col gap-1.5 font-mono text-xs text-graphite">
                        {stage.deliverable.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-stone select-none">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What Client Prepares */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-label uppercase tracking-wider text-clay font-semibold">
                        Keterlibatan & Keputusan Klien
                      </span>
                      <p className="font-sans text-xs text-graphite leading-relaxed">
                        {stage.clientInput}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Transparency & Fee Philosophy Box */}
          <section className="bg-bone/40 p-8 sm:p-12 border border-ink-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="font-mono text-label uppercase tracking-widest text-stone">
                Transparansi Biaya & Kapasitas Studio
              </span>
              <h3 className="font-sans text-2xl font-medium text-ink">
                Kami membatasi penerimaan maksimal 3 proyek baru per semester.
              </h3>
              <p className="font-sans text-sm text-graphite leading-relaxed">
                Pembatasan ini memastikan prinsipal arsitek terlibat langsung dalam setiap sketsa, kalkulasi iklim, dan kunjungan pengawasan lapangan tanpa didelegasikan kepada pihak ketiga.
              </p>
            </div>

            <Pill href="/enquiry" variant="ink" showArrow className="shrink-0">
              Konsultasikan Rencana Anda
            </Pill>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

