export interface Testimonial {
  id: string;
  projectId?: string;
  projectSlug?: string;
  projectTitle?: string;
  quoteId: string;
  quoteEn?: string;
  author: string;
  authorNote?: string;
  isPublished: boolean;
  sortOrder: number;
}

