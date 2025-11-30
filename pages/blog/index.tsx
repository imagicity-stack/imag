import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import BlogCard from '../../components/blog/BlogCard';
import Layout from '../../components/layout/Layout';
import { db } from '../../lib/firebase';
import { BlogPost } from '../../types/blog';
import { mapFirestorePost } from '../../utils';

interface BlogListProps {
  posts: BlogPost[];
}

const PAGE_SIZE = 6;

export default function BlogList({ posts }: BlogListProps) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(posts.length / PAGE_SIZE)), [posts.length]);
  const visiblePosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [page, posts]);

  return (
    <Layout title="IMAGICITY Blog" description="Articles, launch breakdowns, and creative strategies from IMAGICITY.">
      <Head>
        <meta property="og:title" content="IMAGICITY Blog" />
        <meta property="og:description" content="Articles, launch breakdowns, and creative strategies from IMAGICITY." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} />
      </Head>
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-aurum">The Field Notes</p>
          <h1 className="text-4xl font-bold">Latest thinking</h1>
          <p className="text-gray-400">
            Stories, breakdowns, and playbooks from the IMAGICITY crew. Only published work appears here for clean SEO.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-lg border border-gray-700 disabled:opacity-40"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 rounded-lg border border-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogListProps> = async () => {
  const q = query(collection(db, 'posts'), where('isPublished', '==', true), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((docSnap) => mapFirestorePost(docSnap.id, docSnap.data()));

  return {
    props: {
      posts
    },
    revalidate: 60
  };
};
