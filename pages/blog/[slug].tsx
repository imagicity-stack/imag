import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import MarkdownRenderer from '../../components/blog/MarkdownRenderer';
import SocialShare from '../../components/blog/SocialShare';
import TableOfContents from '../../components/blog/TableOfContents';
import Layout from '../../components/layout/Layout';
import { db } from '../../lib/firebase';
import { BlogPost } from '../../types/blog';
import { formatDate, mapFirestorePost, slugifyTitle } from '../../utils';

interface BlogPageProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPage({ post, related }: BlogPageProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${siteUrl}/blog/${post.slug}`;

  const headings = useMemo(() => {
    return post.content
      .split('\n')
      .filter((line) => line.startsWith('#'))
      .map((line) => {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const id = slugifyTitle(text);
        return { text, id, level };
      });
  }, [post.content]);

  const markdownComponents = {
    h1: ({ ...props }) => {
      const text = String(props.children);
      const id = slugifyTitle(text);
      return <h1 id={id} {...props} />;
    },
    h2: ({ ...props }) => {
      const text = String(props.children);
      const id = slugifyTitle(text);
      return <h2 id={id} {...props} />;
    },
    h3: ({ ...props }) => {
      const text = String(props.children);
      const id = slugifyTitle(text);
      return <h3 id={id} {...props} />;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.intro,
    image: post.featuredImageUrl,
    url: canonical,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'IMAGICITY',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    }
  };

  return (
    <Layout title={post.metaTitle || post.title} description={post.metaDescription || post.intro}>
      <Head>
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.intro} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.featuredImageUrl} />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <article className="max-w-6xl mx-auto px-6 py-14 space-y-12">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-aurum">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
          <SocialShare url={canonical} title={post.title} />
          {post.featuredImageUrl && (
            <div className="relative w-full h-[360px] rounded-3xl overflow-hidden border border-gray-800">
              <Image src={post.featuredImageUrl} alt={post.title} fill className="object-cover" />
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-[1fr,320px] gap-10 items-start">
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={post.content} components={markdownComponents} />
          </div>
          <div className="space-y-4">
            <TableOfContents headings={headings} />
            <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
              <p className="text-sm font-semibold text-aurum mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Related posts</h2>
              <Link href="/blog" className="text-sm text-aurum">
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((item) => (
                <Link
                  href={`/blog/${item.slug}`}
                  key={item.id}
                  className="rounded-2xl border border-gray-800 bg-gray-900/50 p-4 hover:border-aurum"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-aurum">{item.category}</p>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.intro}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const q = query(collection(db, 'posts'), where('isPublished', '==', true));
  const snapshot = await getDocs(q);
  const paths = snapshot.docs.map((docSnap) => ({ params: { slug: docSnap.data().slug } }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const postQuery = query(collection(db, 'posts'), where('slug', '==', slug), where('isPublished', '==', true), limit(1));
  const postSnapshot = await getDocs(postQuery);

  if (postSnapshot.empty) {
    return { notFound: true };
  }

  const docSnap = postSnapshot.docs[0];
  const post = mapFirestorePost(docSnap.id, docSnap.data());

  const relatedQuery = query(
    collection(db, 'posts'),
    where('category', '==', post.category),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc'),
    limit(3)
  );
  const relatedSnapshot = await getDocs(relatedQuery);
  const related = relatedSnapshot.docs
    .filter((doc) => doc.id !== docSnap.id)
    .map((item) => mapFirestorePost(item.id, item.data()));

  return {
    props: {
      post,
      related
    },
    revalidate: 120
  };
};
