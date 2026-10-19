import { Project, ProjectFilter } from "@/domain/project";

export interface IProjectRepository {
  getFeaturedProjects(): Promise<Project[]>;
  getAllProjects(filter?: ProjectFilter): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getAdjacentProjects(
    slug: string
  ): Promise<{ prev: Project | null; next: Project | null }>;
}

