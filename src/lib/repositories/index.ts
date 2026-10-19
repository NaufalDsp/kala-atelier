import { IProjectRepository } from "./project.repository";
import { LocalProjectRepository } from "./local-project.repository";
import { SupabaseProjectRepository } from "./supabase-project.repository";

/**
 * Clean Architecture Repository Provider:
 * Automatically uses SupabaseProjectRepository when Supabase credentials are provided in the environment.
 * Otherwise, falls back gracefully to LocalProjectRepository.
 */
const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const projectRepository: IProjectRepository = isSupabaseConfigured
  ? new SupabaseProjectRepository()
  : new LocalProjectRepository();

export * from "./project.repository";
export * from "./local-project.repository";
export * from "./supabase-project.repository";
