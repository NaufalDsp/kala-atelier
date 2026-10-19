import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { EnquiryWizard } from "@/components/enquiry/enquiry-wizard";

export const metadata: Metadata = {
  title: "Konsultasi & Enquiry",
  description:
    "Formulir penyaringan konsultasi perancangan arsitektur dan interior bersama Kala Atelier.",
};

interface EnquiryPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function EnquiryPage({ searchParams }: EnquiryPageProps) {
  const { ref } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      <Header />

      <main className="flex-1 pt-28 pb-32">
        <Container className="flex flex-col gap-12">
          {/* Page Editorial Header */}
          <div className="flex flex-col gap-6 max-w-3xl pt-8">
            <div className="flex items-center gap-3">
              <IndexLabel index="06" />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Formulir Konsultasi
              </span>
            </div>

            <h1 className="font-sans text-display-xl font-medium tracking-tight-title text-ink leading-[0.92]">
              Mulai Diskusi
            </h1>

            <p className="font-sans text-lead text-graphite max-w-xl leading-relaxed text-pretty">
              Bantu kami memahami tapak dan gagasan ruang Anda melalui formulir 6 langkah terstruktur berikut.
            </p>
          </div>

          {/* Wizard Form Component */}
          <div className="pt-4">
            <EnquiryWizard initialRef={ref} />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

