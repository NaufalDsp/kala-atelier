import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Pill } from "@/components/ui/pill";

export function ClosingCTA() {
  return (
    <section className="py-28 md:py-40 bg-paper text-ink border-b border-ink-hairline">
      <Container>
        <div className="flex flex-col gap-10 max-w-4xl">
          <div className="flex items-center gap-3">
            <IndexLabel index={6} />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Langkah Berikutnya
            </span>
          </div>

          <h2 className="font-sans text-display font-medium tracking-tight-title text-ink leading-[0.94] text-balance">
            Siap merancang ruang berikutnya bersama kami?
          </h2>

          <p className="font-sans text-lead text-graphite max-w-xl leading-relaxed text-pretty">
            Konsultasikan rencana tapak, orientasi iklim mikro, dan kisaran alokasi anggaran Anda. Kami menyaring setiap calon proyek dengan seksama demi menjaga kualitas studio.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Pill href="/enquiry" variant="ink" showArrow className="px-7 py-3.5 text-sm">
              Mulai Konsultasi (01/06)
            </Pill>

            <span className="font-mono text-mono text-stone">
              Waktu pengisian formulir: ± 3 menit
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

