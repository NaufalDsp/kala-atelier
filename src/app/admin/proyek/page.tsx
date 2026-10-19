import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { ProjectTable } from "@/components/admin/project-table";
import { projectRepository } from "@/lib/repositories";

export default async function AdminProjectsPage() {
  const projects = await projectRepository.getAllProjects();

  return (
    <Container className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink-hairline">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <IndexLabel index="03" />
            <span className="font-mono text-label uppercase tracking-widest text-graphite">
              Katalog Portofolio
            </span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            Kelola Karya Studio
          </h1>
        </div>

        <div className="font-mono text-xs text-stone">
          Total {projects.length} karya terdaftar dalam sistem
        </div>
      </div>

      {/* Main Project Table Component */}
      <ProjectTable initialProjects={projects} />
    </Container>
  );
}

