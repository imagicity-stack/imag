import { Timestamp } from 'firebase/firestore';
import { BlogPost } from '../types/blog';

export const slugifyTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const formatDate = (value?: string) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const mapFirestorePost = (id: string, data: any): BlogPost => {
  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt || '';
  const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt || createdAt;

  return {
    id,
    title: data.title || '',
    slug: data.slug || '',
    metaTitle: data.metaTitle || data.title || '',
    metaDescription: data.metaDescription || data.intro || '',
    featuredImageUrl: data.featuredImageUrl || '',
    category: data.category || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    intro: data.intro || '',
    content: data.content || '',
    author: data.author || '',
    createdAt,
    updatedAt,
    isPublished: Boolean(data.isPublished)
  };
};
