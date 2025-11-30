export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  featuredImageUrl: string;
  category: string;
  tags: string[];
  intro: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}
