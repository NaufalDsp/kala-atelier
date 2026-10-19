import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan penanganan data pribadi pengunjung dan klien Kala Atelier sesuai UU PDP.",
};

export default function PrivasiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-10 pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="04" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Kepatuhan Hukum
              </span>
            </div>

            <h1 className="font-sans text-display font-medium tracking-tight-title text-ink leading-[0.95]">
              Kebijakan Privasi
            </h1>

            <p className="font-mono text-mono text-stone">
              Terakhir diperbarui: 19 Oktober 2026 &bull; Selaras dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)
            </p>

            <div className="flex flex-col gap-8 font-sans text-body text-graphite leading-relaxed border-t border-ink-hairline pt-10">
              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  1. Informasi yang Kami Kumpulkan
                </h2>
                <p>
                  Kala Atelier hanya mengumpulkan data yang secara sukarela Anda serahkan melalui formulir konsultasi (*enquiry*), meliputi: nama lengkap, alamat email, nomor telepon/WhatsApp, estimasi lokasi lahan/proyek, kisaran anggaran yang dialokasikan, serta catatan ringkas (*brief*) desain.
                </p>
                <p>
                  Kami tidak memasang pelacak pihak ketiga yang invasif (*cookie-less analytics*). Alamat IP yang tercatat dienkripsi secara satu arah (*salted hash*) semata-mata untuk mencegah serangan siber dan pembatasan laju pengiriman formulir (*rate limiting*).
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  2. Tujuan Penggunaan Data
                </h2>
                <p>
                  Data yang dikumpulkan hanya digunakan untuk kepentingan evaluasi kelayakan proyek, korespondensi jadwal konsultasi perancangan oleh prinsipal arsitek, dan penyusunan proposal biaya jasa desain. Kami tidak pernah memperjualbelikan atau membagikan data Anda kepada pihak pengiklan mana pun.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  3. Masa Retensi & Penghapusan
                </h2>
                <p>
                  Data formulir konsultasi yang tidak berlanjut ke tahap perikatan kontrak kerja sama akan dihapus secara otomatis dari basis data kami dalam kurun waktu maksimal 24 (dua puluh empat) bulan.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-sans text-xl font-medium text-ink">
                  4. Hak Subjek Data
                </h2>
                <p>
                  Sesuai ketentuan UU PDP, Anda berhak meminta salinan data pribadi yang tersimpan, mengajukan pembaruan informasi, atau meminta penghapusan data secara permanen kapan saja dengan mengirimkan permohonan ke{" "}
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

