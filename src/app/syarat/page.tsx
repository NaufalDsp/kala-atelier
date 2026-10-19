import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description:
    "Syarat dan ketentuan umum layanan konsultasi perancangan arsitektur Kala Atelier.",
};

export default function SyaratPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-10 pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="05" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Ketentuan Layanan
              </span>
            </div>

            <h1 className="font-sans text-display font-medium tracking-tight-title text-ink leading-[0.95]">
              Syarat Layanan
            </h1>

            <p className="font-mono text-mono text-stone">
              Terakhir diperbarui: 19 Oktober 2026 &bull; Standar Praktik Profesional Arsitek Indonesia
            </p>

            <div className="flex flex-col gap-8 font-sans text-body text-graphite leading-relaxed border-t border-ink-hairline pt-10">
              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  1. Ruang Lingkup Layanan
                </h2>
                <p>
                  Kala Atelier menyediakan jasa profesional berupa perancangan skematik arsitektur, pengembangan desain interior, penyusunan gambar kerja konstruksi (DED), perhitungan estimasi anggaran awal, serta pengawasan berkala pelaksanaan fisik di lapangan.
                </p>
                <p>
                  Pengisian formulir konsultasi daring tidak mengikat kedua belah pihak dalam suatu perikatan hukum sebelum ditandatanganinya Surat Perjanjian Kerja Sama (SPKS) resmi yang memuat jadwal kerja dan termin pembayaran.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  2. Hak Kekayaan Intelektual (HAKI)
                </h2>
                <p>
                  Seluruh sketsa konseptual, model 3D, diagram iklim, dan gambar kerja teknis yang diproduksi oleh Kala Atelier merupakan hak cipta yang dilindungi undang-undang. Klien memperoleh lisensi eksklusif untuk mendirikan satu unit bangunan fisik pada tapak yang disepakati, namun tidak diperkenankan memperbanyak atau menggunakan desain tersebut untuk tapak lain tanpa persetujuan tertulis prinsipal arsitek.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  3. Batas Tanggung Jawab
                </h2>
                <p>
                  Kala Atelier bertanggung jawab atas kesesuaian gambar arsitektur terhadap standar teknis dan regulasi tata kota yang berlaku. Pelaksanaan fisik bangunan, ketepatan metode kerja di lapangan, keselamatan kerja (K3), dan penjaminan mutu struktur beton sepenuhnya menjadi tanggung jawab kontraktor pelaksana utama.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  4. Kontak Informasi Hukum
                </h2>
                <p>
                  Untuk pertanyaan terkait syarat layanan atau permintaan salinan dokumen hukum kerja sama, silakan hubungi tim legal studio kami melalui{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-ink underline hover:text-clay"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

