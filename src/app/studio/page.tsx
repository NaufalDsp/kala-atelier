import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Pill } from "@/components/ui/pill";
import { LOCAL_TEAM } from "@/data/team";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Mengenal filosofi arsitektur tropis, prinsipal arsitek, dan profil tim di balik Kala Atelier.",
};

export default function StudioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="flex flex-col gap-24">
          {/* Header Statement */}
          <section className="flex flex-col gap-6 max-w-4xl pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="01" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Profil Studio
              </span>
            </div>

            <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
              Tentang Kala
            </h1>

            <p className="font-sans text-lead text-graphite max-w-2xl leading-relaxed text-pretty">
              Kala Atelier adalah studio arsitektur dan interior yang berbasis di Jakarta. Nama &ldquo;Kala&rdquo; merujuk pada ketahanan terhadap waktu; sebuah keyakinan bahwa karya arsitektur harus relevan, kokoh, dan anggun sepanjang generasi.
            </p>
          </section>

          {/* Philosophy & Principles Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-ink-hairline pt-16">
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="font-mono text-label uppercase tracking-widest text-stone">
                Tiga Prinsip Pokok
              </span>
              <h2 className="font-sans text-title font-medium tracking-tight text-ink leading-tight">
                Pedoman dalam Setiap Goresan Garis
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-mono text-stone">(01)</span>
                <h3 className="font-sans text-xl font-medium text-ink">
                  Kejujuran Material
                </h3>
                <p className="font-sans text-sm text-graphite leading-relaxed">
                  Bata merah lokal, kayu ulin bekas bantalan rel, beton ekspos, dan batu andesit dibiarkan tampil dengan tekstur aslinya tanpa lapisan cat beracun.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-mono text-stone">(02)</span>
                <h3 className="font-sans text-xl font-medium text-ink">
                  Respons Iklim Tropis
                </h3>
                <p className="font-sans text-sm text-graphite leading-relaxed">
                  Mengutamakan overstek lebar peneduh hujan lebat, ventilasi silang bertingkat, dan orientasi gubahan massa bebas paparan radiasi barat.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-mono text-stone">(03)</span>
                <h3 className="font-sans text-xl font-medium text-ink">
                  Ketenangan Spasial
                </h3>
                <p className="font-sans text-sm text-graphite leading-relaxed">
                  Ruang dirancang sebagai sanctuary yang menenangkan dari hiruk-pikuk kota besar melalui permainan cahaya tidak langsung dan ritme hening.
                </p>
              </div>
            </div>
          </section>

          {/* Team Members Grid */}
          <section className="flex flex-col gap-12 border-t border-ink-hairline pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-label uppercase tracking-widest text-stone">
                  Prinsipal & Kolaborator
                </span>
                <h2 className="font-sans text-display font-medium tracking-tight text-ink">
                  Tim Studio
                </h2>
              </div>

              <span className="font-mono text-mono text-graphite">
                Terakreditasi IAI (Ikatan Arsitek Indonesia) & HDII
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {LOCAL_TEAM.map((member) => (
                <div key={member.id} className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone border border-ink-hairline">
                    {member.photoPath && (
                      <Image
                        src={member.photoPath}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-xl font-medium text-ink">
                      {member.name}
                    </h3>
                    <span className="font-mono text-mono text-clay">
                      {member.roleId}
                    </span>
                    <p className="font-sans text-sm text-graphite pt-2 leading-relaxed">
                      {member.bioId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Studio Practice & Operating Details */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-ink-hairline pt-16 pb-8 bg-bone/30 p-8">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-mono text-label uppercase tracking-widest text-stone">
                Lokasi Praktik
              </span>
              <p className="font-sans text-xl font-medium text-ink">
                Studio Jakarta Selatan
              </p>
              <p className="font-sans text-body text-graphite leading-relaxed">
                Kami menerima kunjungan konsultasi langsung dengan perjanjian terlebih dahulu untuk memastikan setiap diskusi desain mendapatkan perhatian penuh.
              </p>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:items-end lg:text-right">
              <div className="flex flex-col gap-1 font-mono text-mono text-graphite">
                <span>Senin — Jumat: 08:30 — 17:00 WIB</span>
                <span>Sabtu: 09:00 — 14:00 WIB (Khusus Pertemuan Tapak)</span>
                <span>Minggu: Tutup</span>
              </div>

              <Pill href="/enquiry" variant="ink" showArrow>
                Atur Jadwal Konsultasi
              </Pill>
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
