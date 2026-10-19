export interface TeamMember {
  id: string;
  name: string;
  roleId: string;
  roleEn?: string;
  photoPath?: string;
  bioId?: string;
  bioEn?: string;
  sortOrder: number;
}

