import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";

export function Statement() {
  return (
    <section className="py-28 md:py-36 bg-paper text-ink border-b border-ink-hairline">
      <Container>
        <div className="flex flex-col gap-8 max-w-5xl">
          <div className="flex items-center gap-3">
            <IndexLabel index={1} />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Filosofi Ruang
            </span>
          </div>

          <p className="font-sans text-display font-medium tracking-tight-title leading-[1.04] text-balance text-ink">
            Kami merancang ruang yang berakar pada iklim mikro Nusantara — memprioritaskan naungan alami, ventilasi silang pasif, dan ketahanan material lokal yang menua dengan anggun.
          </p>

          <p className="font-sans text-lead text-graphite max-w-2xl leading-relaxed text-pretty pt-4">
            Bukan sekadar bentuk visual yang memamerkan diri, arsitektur adalah bingkai tenang tempat kehidupan berlangsung. Setiap garis denah kami ukur untuk mereduksi panas tropis, menghemat energi, dan memberi rasa nyaman yang abadi.
          </p>
        </div>
      </Container>
    </section>
  );
}

