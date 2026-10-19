import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LocalClock } from "./local-clock";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full bg-ink text-paper pt-24 pb-12 border-t border-paper/10 selection:bg-paper selection:text-ink">
      <Container className="flex flex-col gap-20">
        {/* Top Section: Wordmark Banner */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-paper/15 pb-4">
            <span className="font-mono text-mono text-stone uppercase tracking-wider">
              (00) Kala Atelier
            </span>
            <LocalClock className="text-paper/80" />
          </div>

          <h2 className="font-sans text-display-xl font-medium tracking-[-0.05em] leading-[0.88] select-none text-paper/95">
            Kala Atelier
          </h2>
        </div>

        {/* Middle Section: 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
          {/* Col 1-5: Studio Mission Statement */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8">
            <p className="font-sans text-lead text-paper/75 max-w-md leading-relaxed text-pretty">
              {siteConfig.description}
            </p>

            <div className="flex flex-col gap-2 text-mono font-mono text-stone">
              <span>Jakarta Selatan, DKI Jakarta</span>
              <span>Republik Indonesia</span>
            </div>
          </div>

          {/* Col 6-8: Navigation Directory */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-mono text-stone uppercase tracking-wider">
              Navigasi
            </span>
            <ul className="flex flex-col gap-2.5 text-base font-medium">
              <li>
                <Link
                  href="/karya"
                  className="text-paper/80 hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Karya Studio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="text-paper/80 hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Tentang Studio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/proses"
                  className="text-paper/80 hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Proses Kerja</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-paper/80 hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Galeri Dokumentasi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/enquiry"
                  className="text-paper/80 hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Formulir Konsultasi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Contact & Social */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-mono text-stone uppercase tracking-wider">
              Kontak & Komunikasi
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-2 text-lg font-medium text-paper hover:text-stone transition-colors"
              >
                <span>{siteConfig.contact.email}</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-mono text-paper/80 hover:text-paper transition-colors"
              >
                <span>WhatsApp: {siteConfig.contact.whatsapp}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-mono text-paper/80 hover:text-paper transition-colors"
              >
                <span>Instagram: @kalaatelier</span>
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

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-paper/10 text-mono font-mono text-stone">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privasi" className="hover:text-paper transition-colors">
              Kebijakan Privasi
            </Link>
            <span>&bull;</span>
            <Link href="/syarat" className="hover:text-paper transition-colors">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

