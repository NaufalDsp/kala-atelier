import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { WorksCatalog } from "@/components/works/works-catalog";
import { projectRepository } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Karya",
  description:
    "Katalog karya arsitektur tropis, renovasi adaptif, dan desain interior presisi karya Kala Atelier.",
};

export default async function KaryaPage() {
  const allProjects = await projectRepository.getAllProjects();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="flex flex-col gap-12">
          {/* Page Editorial Header */}
          <div className="flex flex-col gap-6 max-w-4xl pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="01" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Indeks Karya
              </span>
            </div>

            <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
              Karya Arsitektur
            </h1>

            <p className="font-sans text-lead text-graphite max-w-2xl leading-relaxed text-pretty">
              Setiap karya merupakan investigasi mendalam terhadap kondisi iklim mikro lokal, arah hembusan angin pasif, dan tektonika material nusantara yang tahan lama.
            </p>
          </div>

          {/* Interactive Catalog */}
          <WorksCatalog initialProjects={allProjects} />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

