import { IProjectRepository } from "./project.repository";
import { Project, ProjectFilter, ProjectImage, ProjectStage, ProjectCredits } from "@/domain/project";
import { createServerClient } from "@/lib/supabase/server";

interface SupabaseProjectRow {
  id: string;
  slug: string;
  title: string;
  year: number;
  city: string;
  type: "rumah" | "renovasi" | "komersial" | "interior";
  status: "selesai" | "dibangun" | "rancangan";
  summary_id: string;
  summary_en: string | null;
  body_id: string | null;
  body_en: string | null;
  land_area_m2: number | null;
  floor_area_m2: number | null;
  main_materials: string[];
  climate_notes_id: string | null;
  climate_notes_en: string | null;
  credits: unknown;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  project_images?: Array<{
    id: string;
    project_id: string;
    path: string;
    alt_id: string;
    alt_en: string | null;
    width: number;
    height: number;
    blur_data: string | null;
    dominant: string | null;
    is_cover: boolean;
    sort_order: number;
  }>;
  project_stages?: Array<{
    id: string;
    project_id: string;
    label_id: string;
    label_en: string | null;
    progress: number;
    image_id: string | null;
    stage_date: string | null;
    sort_order: number;
  }>;
}

function mapRowToProject(row: SupabaseProjectRow): Project {
  const images: ProjectImage[] = (row.project_images || []).map((img) => ({
    id: img.id,
    projectId: img.project_id,
    path: img.path,
    altId: img.alt_id,
    altEn: img.alt_en || undefined,
    width: img.width,
    height: img.height,
    blurData: img.blur_data || undefined,
    dominant: img.dominant || undefined,
    isCover: img.is_cover,
    sortOrder: img.sort_order,
  })).sort((a, b) => a.sortOrder - b.sortOrder);

  const stages: ProjectStage[] = (row.project_stages || []).map((stg) => ({
    id: stg.id,
    projectId: stg.project_id,
    labelId: stg.label_id,
    labelEn: stg.label_en || undefined,
    progress: stg.progress,
    stageDate: stg.stage_date || undefined,
    sortOrder: stg.sort_order,
  })).sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    year: row.year,
    city: row.city,
    type: row.type,
    status: row.status,
    summaryId: row.summary_id,
    summaryEn: row.summary_en || undefined,
    bodyId: row.body_id || undefined,
    bodyEn: row.body_en || undefined,
    landAreaM2: row.land_area_m2 || undefined,
    floorAreaM2: row.floor_area_m2 || undefined,
    mainMaterials: row.main_materials || [],
    climateNotesId: row.climate_notes_id || undefined,
    climateNotesEn: row.climate_notes_en || undefined,
    credits: (row.credits as ProjectCredits) || {},
    isFeatured: row.is_featured,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    images,
    stages: stages.length > 0 ? stages : undefined,
  };
}

export class SupabaseProjectRepository implements IProjectRepository {
  async getFeaturedProjects(): Promise<Project[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*), project_stages(*)")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      console.error("[SUPABASE ERROR getFeaturedProjects]", error);
      return [];
    }

    return (data as unknown as SupabaseProjectRow[]).map(mapRowToProject);
  }

  async getAllProjects(filter?: ProjectFilter): Promise<Project[]> {
    const supabase = createServerClient();
    let query = supabase
      .from("projects")
      .select("*, project_images(*), project_stages(*)")
      .eq("is_published", true);

    if (filter?.type) {
      query = query.eq("type", filter.type);
    }

    if (filter?.status) {
      query = query.eq("status", filter.status);
    }

    if (filter?.city) {
      query = query.ilike("city", filter.city);
    }

    if (filter?.featuredOnly) {
      query = query.eq("is_featured", true);
    }

    query = query
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false });

    const { data, error } = await query;

    if (error || !data) {
      console.error("[SUPABASE ERROR getAllProjects]", error);
      return [];
    }

    return (data as unknown as SupabaseProjectRow[]).map(mapRowToProject);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*), project_stages(*)")
      .eq("is_published", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error("[SUPABASE ERROR getProjectBySlug]", error);
      return null;
    }

    return mapRowToProject(data as unknown as SupabaseProjectRow);
  }

  async getAdjacentProjects(
    slug: string
  ): Promise<{ prev: Project | null; next: Project | null }> {
    const all = await this.getAllProjects();
    const index = all.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return { prev: null, next: null };
    }

    const prev = index > 0 ? all[index - 1] : null;
    const next = index < all.length - 1 ? all[index + 1] : null;

    return { prev, next };
  }
}

