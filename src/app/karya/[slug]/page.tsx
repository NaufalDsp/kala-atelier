import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Badge } from "@/components/ui/badge";
import { Pill } from "@/components/ui/pill";
import { projectRepository } from "@/lib/repositories";
import { projectTypeLabels, projectStatusLabels } from "@/domain/project";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await projectRepository.getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await projectRepository.getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Karya Tidak Ditemukan",
    };
  }

  return {
    title: `${project.title} — ${project.city}`,
    description: project.summaryId,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await projectRepository.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await projectRepository.getAdjacentProjects(slug);
  const coverImage =
    project.images.find((img) => img.isCover) || project.images[0];
  const galleryImages = project.images.filter((img) => img.id !== coverImage?.id);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 pb-32">
        {/* Project Header & Metadata */}
        <section className="pt-8 pb-14 border-b border-ink-hairline">
          <Container className="flex flex-col gap-10">
            {/* Back link & Index */}
            <div className="flex items-center justify-between font-mono text-label uppercase tracking-widest text-graphite">
              <Link
                href="/karya"
                className="group inline-flex items-center gap-2 hover:text-ink transition-colors"
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span>Kembali ke Indeks Karya</span>
              </Link>

              <span className="text-stone">
                {projectTypeLabels[project.type]?.id} &bull; {project.year}
              </span>
            </div>

            {/* Title & Tagline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <IndexLabel index={project.sortOrder || 1} />
                  {project.status === "dibangun" ? (
                    <Badge variant="clay" withDot>
                      {projectStatusLabels[project.status]?.id}
                    </Badge>
                  ) : (
                    <span className="font-mono text-mono text-stone uppercase">
                      {projectStatusLabels[project.status]?.id}
                    </span>
                  )}
                </div>

                <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
                  {project.title}
                </h1>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end lg:text-right">
                <span className="font-mono text-mono text-stone uppercase tracking-wider">
                  Lokasi Tapak
                </span>
                <p className="font-sans text-2xl font-medium text-ink">
                  {project.city}, Indonesia
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Cover Image */}
        {coverImage && (
          <section className="w-full pb-20">
            <Container>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bone border border-ink-hairline">
                <Image
                  src={coverImage.path}
                  alt={coverImage.altId || project.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="pt-3 flex justify-between font-mono text-mono text-stone">
                <span>{coverImage.altId}</span>
                <span>(01/{project.images.length})</span>
              </div>
            </Container>
          </section>
        )}

        {/* Narrative & Project Facts Grid */}
        <section className="pb-24 border-b border-ink-hairline">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Narrative (col 1-7) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <span className="font-mono text-label uppercase tracking-widest text-stone">
                  Narasi Arsitektur
                </span>

                <p className="font-sans text-lead text-ink font-medium leading-relaxed text-pretty">
                  {project.summaryId}
                </p>

                {project.bodyId && (
                  <div className="flex flex-col gap-6 font-sans text-body text-graphite leading-relaxed max-w-[62ch]">
                    {project.bodyId.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Technical Facts Table (col 8-12) */}
              <div className="lg:col-span-5 flex flex-col gap-8 bg-bone/30 p-6 sm:p-8 border border-ink-hairline">
                <span className="font-mono text-label uppercase tracking-widest text-ink border-b border-ink-hairline pb-2">
                  Fakta Teknis & Iklim
                </span>

                <div className="flex flex-col divide-y divide-ink-hairline font-mono text-mono">
                  {project.landAreaM2 && (
                    <div className="py-3 flex justify-between">
                      <span className="text-stone uppercase">Luas Lahan</span>
                      <span className="text-ink">{project.landAreaM2} m²</span>
                    </div>
                  )}

                  {project.floorAreaM2 && (
                    <div className="py-3 flex justify-between">
                      <span className="text-stone uppercase">Luas Bangunan</span>
                      <span className="text-ink">{project.floorAreaM2} m²</span>
                    </div>
                  )}

                  <div className="py-3 flex justify-between">
                    <span className="text-stone uppercase">Tipologi</span>
                    <span className="text-ink">
                      {projectTypeLabels[project.type]?.id}
                    </span>
                  </div>

                  <div className="py-3 flex justify-between">
                    <span className="text-stone uppercase">Tahun Selesai</span>
                    <span className="text-ink">{project.year}</span>
                  </div>
                </div>

                {/* Materials List */}
                {project.mainMaterials.length > 0 && (
                  <div className="flex flex-col gap-3 pt-2 border-t border-ink-hairline">
                    <span className="font-mono text-label uppercase tracking-wider text-stone">
                      Material Utama
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {project.mainMaterials.map((mat) => (
                        <li
                          key={mat}
                          className="px-3 py-1 font-mono text-[12px] bg-paper text-ink border border-ink-hairline"
                        >
                          {mat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Climate Strategies Highlight */}
                {project.climateNotesId && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-ink-hairline">
                    <span className="font-mono text-label uppercase tracking-wider text-clay">
                      Strategi Iklim Tropis
                    </span>
                    <p className="font-sans text-sm text-graphite leading-relaxed">
                      {project.climateNotesId}
                    </p>
                  </div>
                )}

                {/* Credits */}
                {project.credits && Object.keys(project.credits).length > 0 && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-ink-hairline font-mono text-[12px] text-stone">
                    {project.credits.fotografer && (
                      <div>Fotografi: {project.credits.fotografer}</div>
                    )}
                    {project.credits.kontraktor && (
                      <div>Pelaksana: {project.credits.kontraktor}</div>
                    )}
                    {project.credits.struktur && (
                      <div>Konsultan Struktur: {project.credits.struktur}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Construction Timeline Section (if status = dibangun) */}
        {project.status === "dibangun" && project.stages && project.stages.length > 0 && (
          <section className="py-24 border-b border-ink-hairline bg-bone/20">
            <Container>
              <div className="flex flex-col gap-8 max-w-4xl">
                <div className="flex items-center gap-3">
                  <IndexLabel index="02" />
                  <span className="font-mono text-label uppercase tracking-widest text-clay">
                    Transparansi Konstruksi Lapangan
                  </span>
                </div>

                <h2 className="font-sans text-title font-medium tracking-tight text-ink">
                  Linimasa Progres Pembangunan
                </h2>

                <div className="flex flex-col divide-y divide-ink-hairline pt-4 border-t border-ink-hairline">
                  {project.stages.map((stg) => (
                    <div
                      key={stg.id}
                      className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <IndexLabel index={stg.sortOrder} />
                        <span className="font-sans text-xl font-medium text-ink">
                          {stg.labelId}
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        {stg.stageDate && (
                          <span className="font-mono text-mono text-stone">
                            {stg.stageDate}
                          </span>
                        )}
                        <span className="font-mono text-mono font-semibold text-ink px-3 py-1 bg-paper border border-ink-hairline">
                          {stg.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Gallery Photos (Alternating 2-column layout) */}
        {galleryImages.length > 0 && (
          <section className="py-24 border-b border-ink-hairline">
            <Container className="flex flex-col gap-16">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-label uppercase tracking-widest text-stone">
                  Dokumentasi Spasial
                </span>
                <h2 className="font-sans text-title font-medium tracking-tight text-ink">
                  Detail & Ruang
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {galleryImages.map((img, i) => (
                  <div key={img.id} className="flex flex-col gap-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone border border-ink-hairline">
                      <Image
                        src={img.path}
                        alt={img.altId || `${project.title} gambar ${i + 2}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                    </div>
                    <span className="font-mono text-mono text-stone text-xs">
                      {img.altId}
                    </span>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Action Call & Similar Project Inquiry */}
        <section className="py-24 border-b border-ink-hairline bg-bone/40">
          <Container>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 max-w-4xl">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-2xl font-medium text-ink">
                  Tertarik merancang ruang dengan pendekatan serupa?
                </h3>
                <p className="font-sans text-graphite text-base">
                  Diskusikan tapak Anda bersama tim arsitek Kala Atelier.
                </p>
              </div>

              <Pill
                href={`/enquiry?ref=${project.slug}`}
                variant="ink"
                showArrow
                className="shrink-0"
              >
                Mulai Proyek Serupa
              </Pill>
            </div>
          </Container>
        </section>

        {/* Adjacent Navigation */}
        <section className="py-12">
          <Container>
            <div className="flex items-center justify-between font-mono text-label uppercase tracking-wider text-graphite">
              {prev ? (
                <Link
                  href={`/karya/${prev.slug}`}
                  className="group inline-flex items-center gap-2 hover:text-ink transition-colors"
                >
                  <ArrowLeft
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  <span>Sebelumnya: {prev.title}</span>
                </Link>
              ) : (
                <span className="text-stone/40">Awal Katalog</span>
              )}

              {next ? (
                <Link
                  href={`/karya/${next.slug}`}
                  className="group inline-flex items-center gap-2 hover:text-ink transition-colors"
                >
                  <span>Berikutnya: {next.title}</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <span className="text-stone/40">Akhir Katalog</span>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
