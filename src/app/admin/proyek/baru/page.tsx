import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { ProjectForm } from "@/components/admin/project-form";

export default function AdminNewProjectPage() {
  return (
    <Container className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-ink-hairline">
        <div className="flex items-center gap-3">
          <IndexLabel index="+" />
          <span className="font-mono text-label uppercase tracking-widest text-graphite">
            Arsip Baru
          </span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink">
          Tambah Proyek Portofolio
        </h1>
        <p className="font-sans text-sm text-graphite">
          Dokumentasikan karya arsitektur, parameter iklim tropis, dan spesifikasi material Nusantara.
        </p>
      </div>

      {/* Form Component */}
      <ProjectForm />
    </Container>
  );
}

