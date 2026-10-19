import { z } from "zod";

export const ENQUIRY_STATUSES = ["baru", "dihubungi", "cocok", "tidak_cocok", "arsip"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const ENQUIRY_BUDGETS = [
  "lt500jt",
  "500jt-1m",
  "1m-2m",
  "2m-5m",
  "gt5m",
  "belum_tahu",
] as const;
export type EnquiryBudget = (typeof ENQUIRY_BUDGETS)[number];

export const BUILDER_STATUSES = ["ya", "belum_ada_calon", "butuh_bantuan"] as const;
export type BuilderStatus = (typeof BUILDER_STATUSES)[number];

export const ENQUIRY_SOURCES = [
  "teman",
  "keluarga",
  "google",
  "instagram",
  "lainnya",
] as const;
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export const enquiryInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama wajib diisi (minimal 2 karakter)")
    .max(80, "Nama maksimal 80 karakter"),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid"),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp minimal 8 digit")
    .max(20, "Nomor WhatsApp maksimal 20 digit")
    .optional()
    .or(z.literal("")),
  projectTypes: z
    .array(z.string())
    .min(1, "Pilih minimal 1 jenis proyek"),
  location: z
    .string()
    .trim()
    .min(2, "Lokasi lahan wajib diisi (minimal 2 karakter)")
    .max(120, "Lokasi maksimal 120 karakter"),
  timeline: z.string().trim().max(100).optional(),
  budget: z.enum(ENQUIRY_BUDGETS).optional(),
  hasBuilder: z.enum(BUILDER_STATUSES).optional(),
  builderNote: z.string().trim().max(300).optional(),
  brief: z.string().trim().max(2000, "Brief maksimal 2.000 karakter").optional(),
  source: z.enum(ENQUIRY_SOURCES).optional(),
  refProject: z.string().trim().optional(),
  turnstileToken: z.string().optional(),
  website: z.string().max(0, "Spam detected").optional(), // Honeypot
});

export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

export interface Enquiry extends Omit<EnquiryInput, "website" | "turnstileToken"> {
  id: string;
  status: EnquiryStatus;
  ipHash?: string;
  createdAt: string;
}

export const budgetLabels: Record<EnquiryBudget, string> = {
  lt500jt: "< Rp500 Juta",
  "500jt-1m": "Rp500 Juta – Rp1 Miliar",
  "1m-2m": "Rp1 Miliar – Rp2 Miliar",
  "2m-5m": "Rp2 Miliar – Rp5 Miliar",
  gt5m: "> Rp5 Miliar",
  belum_tahu: "Belum Ditentukan",
};

export const builderStatusLabels: Record<BuilderStatus, string> = {
  ya: "Sudah memiliki kontraktor rekanan",
  belum_ada_calon: "Belum ada calon / masih mencari",
  butuh_bantuan: "Membutuhkan bantuan seleksi kontraktor dari studio",
};

export const sourceLabels: Record<EnquirySource, string> = {
  teman: "Rekomendasi Teman / Kolega",
  keluarga: "Keluarga / Kerabat",
  google: "Pencarian Web Google",
  instagram: "Instagram (@kalaatelier)",
  lainnya: "Lainnya",
};

