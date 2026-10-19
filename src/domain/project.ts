import { z } from "zod";

export const PROJECT_TYPES = ["rumah", "renovasi", "komersial", "interior"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_STATUSES = ["selesai", "dibangun", "rancangan"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectImage {
  id: string;
  projectId: string;
  path: string;
  altId: string;
  altEn?: string;
  width: number;
  height: number;
  blurData?: string;
  dominant?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface ProjectStage {
  id: string;
  projectId: string;
  labelId: string;
  labelEn?: string;
  progress: number; // 0 to 100
  imagePath?: string;
  stageDate?: string;
  sortOrder: number;
}

export interface ProjectCredits {
  fotografer?: string;
  kontraktor?: string;
  struktur?: string;
  lansekap?: string;
  [key: string]: string | undefined;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  city: string;
  type: ProjectType;
  status: ProjectStatus;
  summaryId: string;
  summaryEn?: string;
  bodyId?: string;
  bodyEn?: string;
  landAreaM2?: number;
  floorAreaM2?: number;
  mainMaterials: string[];
  climateNotesId?: string;
  climateNotesEn?: string;
  credits: ProjectCredits;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ProjectImage[];
  stages?: ProjectStage[];
}

export interface ProjectFilter {
  type?: ProjectType;
  status?: ProjectStatus;
  city?: string;
  featuredOnly?: boolean;
}

export const projectTypeLabels: Record<ProjectType, { id: string; en: string }> = {
  rumah: { id: "Rumah Tinggal", en: "Residential" },
  renovasi: { id: "Renovasi", en: "Renovation" },
  komersial: { id: "Komersial", en: "Commercial" },
  interior: { id: "Interior", en: "Interior" },
};

export const projectStatusLabels: Record<ProjectStatus, { id: string; en: string }> = {
  selesai: { id: "Selesai", en: "Completed" },
  dibangun: { id: "Dalam Pembangunan", en: "Under Construction" },
  rancangan: { id: "Rancangan Desain", en: "Design Phase" },
};

