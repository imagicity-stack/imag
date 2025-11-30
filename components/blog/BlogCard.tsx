import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-plum/60 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
      <div className="relative h-52 w-full">
        {post.featuredImageUrl ? (
          <Image src={post.featuredImageUrl} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500">No image</div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="text-xs uppercase tracking-wide text-aurum">{post.category}</div>
        <Link href={`/blog/${post.slug}`} className="text-xl font-bold text-white">
          {post.title}
        </Link>
        <p className="text-gray-300 text-sm line-clamp-3">{post.intro}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatDate(post.createdAt)}</span>
          <div className="flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full bg-gray-800 text-gray-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
