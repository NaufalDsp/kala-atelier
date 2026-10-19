import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Sketsa Desain & Studi Tapak",
    duration: "3 — 4 Minggu",
    desc: "Analisis orientasi matahari, hembusan angin tapak, dan kebutuhan ruang klien. Menghasilkan konsep denah makro dan eksplorasi gubahan massa.",
    deliverable: "Buku Konsep Awal, Sketsa 3D Massa, Diagram Sirkulasi Udara",
  },
  {
    step: 2,
    title: "Pengembangan Desain & Material",
    duration: "4 — 6 Minggu",
    desc: "Pematangan denah arsitektur, penetapan proporsi ruang, palet material taktil (bata, kayu, beton), serta simulasi pencahayaan alami.",
    deliverable: "Visualisasi 3D Fotorealistis, Sampel Material Fisik, Rencana Anggaran Awal",
  },
  {
    step: 3,
    title: "Pengajuan PBG & Perizinan",
    duration: "4 — 8 Minggu",
    desc: "Penyusunan berkas teknis perizinan Persetujuan Bangunan Gedung (PBG) dan kepatuhan garis sempadan bangunan sesuai regulasi tata kota setempat.",
    deliverable: "Dokumen Gambar Teknis PBG, Perhitungan KDB/KLB",
  },
  {
    step: 4,
    title: "Detail Arsitektur & Interior",
    duration: "4 — 5 Minggu",
    desc: "Perancangan detail furnitur tanam (*built-in cabinetry*), sambungan tektonik kayu-baja, dan spesifikasi armature pencahayaan buatan.",
    deliverable: "Gambar Detail Joinery 1:20 & 1:10, Jadwal Spesifikasi Lampu & Sanitair",
  },
  {
    step: 5,
    title: "Gambar Kerja Konstruksi (DED)",
    duration: "5 — 7 Minggu",
    desc: "Pembuatan dokumen gambar kerja arsitektur lengkap, koordinasi struktur beton bertulang, dan mekanikal-elektrikal-plumbing (MEP).",
    deliverable: "Bundel Gambar Kerja Konstruksi Lengkap, Rencana Kerja & Syarat (RKS), BoQ",
  },
  {
    step: 6,
    title: "Pengawasan Berkala Konstruksi",
    duration: "Sesuai Durasi Fisik",
    desc: "Kunjungan rutin ke lokasi proyek oleh prinsipal arsitek untuk memastikan pelaksanaan di lapangan presisi sesuai spesifikasi gambar kerja.",
    deliverable: "Laporan Kunjungan Berkala Lapangan, Klarifikasi Teknis Kontraktor",
  },
];

export function ProcessList() {
  return (
    <section className="py-24 md:py-32 bg-paper text-ink border-b border-ink-hairline">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Sticky Column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <IndexLabel index={4} />
                <span className="font-mono text-label uppercase tracking-widest text-graphite">
                  Proses Kerja
                </span>
              </div>

              <h2 className="font-sans text-display font-medium tracking-tight-title text-ink leading-[0.98] text-balance">
                Tahapan Perancangan
              </h2>

              <p className="font-sans text-base text-graphite leading-relaxed text-pretty">
                Kami menerapkan metodologi 6 tahap yang transparan dari sketsa awal hingga pengawasan lapangan. Klien mengetahui secara pasti jadwal keluaran dan keputusan yang perlu diambil.
              </p>

              <div className="border-t border-ink-hairline pt-6 font-mono text-mono text-stone">
                Total estimasi fase perancangan: ± 4 hingga 6 bulan sebelum konstruksi fisik dimulai.
              </div>
            </div>
          </div>

          {/* Right Column: 6 Stages Vertical List */}
          <div className="lg:col-span-8 flex flex-col border-t border-ink-hairline">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="py-8 border-b border-ink-hairline flex flex-col gap-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-4">
                    <IndexLabel index={item.step} total={6} />
                    <h3 className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-ink">
                      {item.title}
                    </h3>
                  </div>

                  <span className="font-mono text-label uppercase tracking-wider text-stone sm:text-right shrink-0">
                    Durasi: {item.duration}
                  </span>
                </div>

                <p className="font-sans text-body text-graphite max-w-2xl leading-relaxed pl-0 sm:pl-12">
                  {item.desc}
                </p>

                <div className="pl-0 sm:pl-12 pt-2 flex flex-col sm:flex-row sm:items-center gap-2 font-mono text-mono text-graphite">
                  <span className="text-stone uppercase text-[11px] tracking-wider">
                    Keluaran:
                  </span>
                  <span>{item.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

