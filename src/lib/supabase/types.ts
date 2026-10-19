export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          email: string;
        };
        Insert: {
          email: string;
        };
        Update: {
          email?: string;
        };
      };
      projects: {
        Row: {
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
          credits: Json;
          is_featured: boolean;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      project_images: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["project_images"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_images"]["Insert"]>;
      };
      project_stages: {
        Row: {
          id: string;
          project_id: string;
          label_id: string;
          label_en: string | null;
          progress: number;
          image_id: string | null;
          stage_date: string | null;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["project_stages"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_stages"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          project_id: string | null;
          quote_id: string;
          quote_en: string | null;
          author: string;
          author_note: string | null;
          is_published: boolean;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role_id: string;
          role_en: string | null;
          photo_path: string | null;
          bio_id: string | null;
          bio_en: string | null;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["team_members"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["team_members"]["Insert"]>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          project_types: string[];
          location: string;
          timeline: string | null;
          budget: string | null;
          has_builder: string | null;
          builder_note: string | null;
          brief: string | null;
          source: string | null;
          ref_project: string | null;
          status: "baru" | "dihubungi" | "cocok" | "tidak_cocok" | "arsip";
          ip_hash: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["enquiries"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: number;
          email: string | null;
          phone: string | null;
          whatsapp: string | null;
          address: string | null;
          opening_hours: Json | null;
          enquiry_note_id: string | null;
          enquiry_note_en: string | null;
          instagram: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
  };
}

