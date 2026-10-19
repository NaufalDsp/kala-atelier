import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { IndexLabel } from "@/components/ui/index-label";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-paper text-ink selection:bg-stone selection:text-ink">
      {/* Editorial Header */}
      <header className="w-full border-b border-ink-hairline py-6">
        <Container className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-2xl font-medium tracking-[-0.045em] text-ink">
              {siteConfig.shortName}
            </span>
            <span className="font-mono text-mono text-graphite hidden sm:inline">
              ({siteConfig.descriptor})
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-label font-semibold tracking-[0.04em] uppercase text-graphite">
            <span className="hover:text-ink transition-colors cursor-pointer">Karya</span>
            <span className="hover:text-ink transition-colors cursor-pointer">Studio</span>
            <span className="hover:text-ink transition-colors cursor-pointer">Proses</span>
            <span className="hover:text-ink transition-colors cursor-pointer">Galeri</span>
          </nav>

          <Pill href="/enquiry" variant="ink" showArrow>
            Hubungi kami
          </Pill>
        </Container>
      </header>

      {/* Editorial Hero Teaser */}
      <section className="py-24 sm:py-32 flex-1 flex flex-col justify-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <IndexLabel index={1} />
                <Badge variant="clay" withDot>
                  Dalam Pembangunan
                </Badge>
              </div>

              <h1 className="font-sans text-display-xl font-medium tracking-tighter leading-[0.92] text-balance">
                Arsitektur tropis yang kokoh, tenang, dan tahan lama.
              </h1>

              <p className="font-sans text-lead text-graphite max-w-xl text-pretty leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end gap-6 border-t lg:border-t-0 lg:border-l border-ink-hairline pt-8 lg:pt-0 lg:pl-10">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-mono text-stone uppercase tracking-wider">
                  Fokus Studio
                </span>
                <p className="font-sans text-base text-ink">
                  Rumah Tinggal Khusus, Renovasi Kontekstual, Ruang Komersial Kompak.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-mono text-stone uppercase tracking-wider">
                  Lokasi & Basis
                </span>
                <p className="font-sans text-base text-ink">
                  {siteConfig.location.city}, {siteConfig.location.country}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group inline-flex items-center gap-2 font-mono text-mono text-ink border-b border-ink-hairline pb-0.5 hover:border-ink transition-colors"
                >
                  <span>{siteConfig.contact.email}</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Minimal Footer */}
      <footer className="w-full border-t border-ink-hairline py-8 text-graphite">
        <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-mono">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span className="text-stone select-none">&bull;</span>
            <span className="font-mono text-mono">Jakarta, WIB</span>
          </div>

          <div className="font-mono text-mono text-stone">
            Fondasi v0.1 — Next.js & Tailwind CSS v4
          </div>
        </Container>
      </footer>
    </main>
  );
}
