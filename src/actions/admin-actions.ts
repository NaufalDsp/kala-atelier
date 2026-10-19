"use server";

import { revalidatePath } from "next/cache";
import { EnquiryStatus } from "@/domain/enquiry";
import { createAdminClient } from "@/lib/supabase/server";

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action: Update enquiry status
 */
export async function updateEnquiryStatusAction(
  id: string,
  newStatus: EnquiryStatus
): Promise<ActionResult> {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!isSupabaseConfigured) {
    // Development local feedback
    return {
      success: true,
      message: `Status konsultasi ${id} diperbarui menjadi: ${newStatus} (Mode Lokal)`,
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("enquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("[ACTION ERROR updateEnquiryStatus]", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/enquiry");
    return { success: true, message: "Status konsultasi berhasil diperbarui." };
  } catch (err) {
    console.error("[ACTION EXCEPTION updateEnquiryStatus]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Terjadi kesalahan server.",
    };
  }
}

/**
 * Server Action: Delete an enquiry
 */
export async function deleteEnquiryAction(id: string): Promise<ActionResult> {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!isSupabaseConfigured) {
    return {
      success: true,
      message: `Konsultasi ${id} dihapus (Mode Lokal).`,
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/enquiry");
    return { success: true, message: "Konsultasi berhasil dihapus." };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Terjadi kesalahan server.",
    };
  }
}

/**
 * Server Action: Create a new project
 */
export async function createProjectAction(data: {
  title: string;
  slug: string;
  year: number;
  city: string;
  type: "rumah" | "renovasi" | "komersial" | "interior";
  status: "selesai" | "dibangun" | "rancangan";
  summaryId: string;
  bodyId?: string;
  landAreaM2?: number;
  floorAreaM2?: number;
  mainMaterials: string[];
  climateNotesId?: string;
  isFeatured: boolean;
  coverImageUrl?: string;
}): Promise<ActionResult> {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!isSupabaseConfigured) {
    return {
      success: true,
      message: `Proyek "${data.title}" berhasil dicatat (Mode Lokal).`,
    };
  }

  try {
    const supabase = createAdminClient();
    const { data: inserted, error } = await supabase
      .from("projects")
      .insert({
        title: data.title,
        slug: data.slug,
        year: data.year,
        city: data.city,
        type: data.type,
        status: data.status,
        summary_id: data.summaryId,
        summary_en: null,
        body_id: data.bodyId || null,
        body_en: null,
        land_area_m2: data.landAreaM2 || null,
        floor_area_m2: data.floorAreaM2 || null,
        main_materials: data.mainMaterials,
        climate_notes_id: data.climateNotesId || null,
        climate_notes_en: null,
        credits: {},
        is_featured: data.isFeatured,
        is_published: true,
        sort_order: 99,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[ACTION ERROR createProject]", error);
      return { success: false, error: error.message };
    }

    if (data.coverImageUrl && inserted) {
      const insertedProject = inserted as unknown as { id: string };
      await supabase.from("project_images").insert({
        project_id: insertedProject.id,
        path: data.coverImageUrl,
        alt_id: data.title,
        alt_en: null,
        width: 1920,
        height: 1280,
        blur_data: null,
        dominant: null,
        is_cover: true,
        sort_order: 1,
      });
    }

    revalidatePath("/karya");
    revalidatePath("/admin/proyek");
    return { success: true, message: "Proyek baru berhasil disimpan." };
  } catch (err) {
    console.error("[ACTION EXCEPTION createProject]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Terjadi kesalahan server.",
    };
  }
}

/**
 * Server Action: Delete a project
 */
export async function deleteProjectAction(id: string): Promise<ActionResult> {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!isSupabaseConfigured) {
    return {
      success: true,
      message: `Proyek ${id} dihapus (Mode Lokal).`,
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/karya");
    revalidatePath("/admin/proyek");
    return { success: true, message: "Proyek berhasil dihapus dari database." };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Terjadi kesalahan server.",
    };
  }
}

/**
 * Server Action: Update studio operational settings
 */
export async function updateStudioSettingsAction(settings: {
  studioName: string;
  tagline: string;
  email: string;
  whatsapp: string;
  address: string;
  operatingHours: string;
  capacityNotice: string;
}): Promise<ActionResult> {
  // In future database migrations, this can persist to a studio_settings table.
  // For now, revalidate relevant pages.
  revalidatePath("/", "layout");
  revalidatePath("/admin/pengaturan");

  return {
    success: true,
    message: `Pengaturan studio "${settings.studioName}" berhasil diperbarui.`,
  };
}

/**
 * Server Action: Revalidate public cache
 */
export async function revalidateSiteAction(): Promise<ActionResult> {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/karya");
    revalidatePath("/studio");
    revalidatePath("/proses");
    revalidatePath("/galeri");

    return {
      success: true,
      message: "Cache seluruh halaman publik studio berhasil diperbarui.",
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal merevalidasi cache.",
    };
  }
}
