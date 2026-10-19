import { IProjectRepository } from "./project.repository";
import { LocalProjectRepository } from "./local-project.repository";

// Clean Architecture Repository Provider
// Switching between Local Mock (Phase 1-4) and Supabase (Phase 5+) happens seamlessly here.
export const projectRepository: IProjectRepository = new LocalProjectRepository();

export * from "./project.repository";
export * from "./local-project.repository";

