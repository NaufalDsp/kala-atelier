import { Project, ProjectFilter } from "@/domain/project";
import { IProjectRepository } from "./project.repository";
import { LOCAL_PROJECTS } from "@/data/projects";

export class LocalProjectRepository implements IProjectRepository {
  async getFeaturedProjects(): Promise<Project[]> {
    return LOCAL_PROJECTS.filter((p) => p.isPublished && p.isFeatured).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }

  async getAllProjects(filter?: ProjectFilter): Promise<Project[]> {
    let result = LOCAL_PROJECTS.filter((p) => p.isPublished);

    if (filter?.type) {
      result = result.filter((p) => p.type === filter.type);
    }

    if (filter?.status) {
      result = result.filter((p) => p.status === filter.status);
    }

    if (filter?.city) {
      result = result.filter(
        (p) => p.city.toLowerCase() === filter.city?.toLowerCase()
      );
    }

    if (filter?.featuredOnly) {
      result = result.filter((p) => p.isFeatured);
    }

    return result.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return b.year - a.year;
    });
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const found = LOCAL_PROJECTS.find(
      (p) => p.isPublished && p.slug === slug
    );
    return found || null;
  }

  async getAdjacentProjects(
    slug: string
  ): Promise<{ prev: Project | null; next: Project | null }> {
    const published = LOCAL_PROJECTS.filter((p) => p.isPublished).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    const index = published.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return { prev: null, next: null };
    }

    const prev = index > 0 ? published[index - 1] : null;
    const next = index < published.length - 1 ? published[index + 1] : null;

    return { prev, next };
  }
}

