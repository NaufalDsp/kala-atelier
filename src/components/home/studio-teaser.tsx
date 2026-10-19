import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";

export function StudioTeaser() {
  return (
    <section className="py-24 md:py-32 bg-paper text-ink border-b border-ink-hairline">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Tactile Material Image */}
          <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden bg-bone">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop"
              alt="Eksplorasi tektonika material kayu dan beton di studio Kala Atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[11px] text-paper/80 bg-ink/60 px-2.5 py-1">
              Dokumentasi Riset Material
            </div>
          </div>

          {/* Right Column: Studio Ethos */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <IndexLabel index={2} />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Tentang Studio
              </span>
            </div>

            <h2 className="font-sans text-title font-medium tracking-tight text-ink text-balance leading-tight">
              Sebuah bengkel kerja arsitektur yang percaya pada kejujuran tektonika dan presisi tropis.
            </h2>

            <div className="flex flex-col gap-5 text-body text-graphite max-w-[62ch] leading-relaxed">
              <p>
                Didirikan di Jakarta, Kala Atelier memandang setiap tapak bukan sebagai kanvas kosong, melainkan dialog antara iklim, arah angin monsun, dan kebiasaan hidup penghuninya.
              </p>
              <p>
                Kami menolak dekorasi berlebih yang menutupi cacat struktur. Setiap sambungan kayu, susunan bata bakar berongga, dan permukaan beton ekspos dibiarkan bernapas dengan jujur. Bagi kami, arsitektur yang baik adalah yang semakin indah saat menua bersama waktu.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/studio"
                className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-wider text-ink border-b border-ink-hairline pb-1 hover:border-ink transition-colors"
              >
                <span>Pelajari etos & profil tim studio</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

