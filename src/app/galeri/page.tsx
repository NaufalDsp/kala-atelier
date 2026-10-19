import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { GalleryView } from "@/components/gallery/gallery-view";
import { projectRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Galeri Dokumentasi",
  description:
    "Galeri arsip fotografi arsitektur, detail tektonik material, dan interior karya Kala Atelier.",
};

export default async function GaleriPage() {
  const allProjects = await projectRepository.getAllProjects();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-6 max-w-4xl pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="03" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Arsip Visual
              </span>
            </div>

            <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
              Galeri Dokumentasi
            </h1>

            <p className="font-sans text-lead text-graphite max-w-2xl leading-relaxed text-pretty">
              Kompilasi fotografi spasial, permainan bayangan fasad terakota, dan detail sambungan konstruksi kayu dari berbagai proyek studio kami.
            </p>
          </div>

          {/* Interactive Lightbox Gallery View */}
          <GalleryView projects={allProjects} />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

