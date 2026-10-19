import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Project } from "@/domain/project";

interface HeroProps {
  featuredProject?: Project;
}

export function Hero({ featuredProject }: HeroProps) {
  // Editorial hero background image: Modern tropical architecture with concrete, timber, and lush greenery
  const heroImageUrl =
    featuredProject?.images[0]?.path ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2560&auto=format&fit=crop";

  const projectTitle = featuredProject?.title || "Rumah Cilandak";
  const projectYear = featuredProject?.year || 2024;
  const projectSlug = featuredProject?.slug || "rumah-cilandak";

  return (
    <section className="relative w-full h-[100svh] min-h-[680px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-ink text-paper select-none">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt={`Karya Arsitektur Tropis Kala Atelier — ${projectTitle}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-100 will-change-transform"
        />

        {/* Triple-stop protective gradient overlay per DESIGN.md §8.3 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(17,17,15,0.45) 0%, rgba(17,17,15,0.15) 38%, rgba(17,17,15,0.78) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Top Spacer for Fixed Header */}
      <div className="h-24 w-full z-10" aria-hidden="true" />

      {/* Middle Meta Row (at ~50% height) */}
      <div className="relative z-10 w-full py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-t border-paper/20 pt-4 text-paper/90">
            <div className="md:col-span-4 font-mono text-label uppercase tracking-widest text-paper/70">
              Proyek Unggulan
            </div>

            <div className="md:col-span-4 font-sans text-lg font-medium tracking-tight">
              {projectTitle}
            </div>

            <div className="md:col-span-2 font-mono text-mono text-paper/70">
              {projectYear}
            </div>

            <div className="md:col-span-2 md:text-right">
              <Link
                href={`/karya/${projectSlug}`}
                className="group inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-wider text-paper border-b border-paper/50 pb-0.5 hover:border-paper transition-colors focus-visible:outline focus-visible:outline-2"
              >
                <span>Lihat proyek</span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Statement & Scroll Down Cue */}
      <div className="relative z-10 w-full pb-10 sm:pb-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* 3-line statement */}
            <div className="lg:col-span-8">
              <h1 className="font-sans text-statement font-medium tracking-[-0.035em] text-paper max-w-2xl leading-[1.05] text-balance">
                Arsitektur tropis yang kokoh, tenang, dan tahan lama.
              </h1>
            </div>

            {/* Scroll Down Indicator */}
            <div className="lg:col-span-4 lg:text-right">
              <span className="font-mono text-label uppercase tracking-widest text-paper/60 inline-flex items-center gap-2">
                <span>(Gulir ke bawah)</span>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

