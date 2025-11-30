import { collection, getDocs, query, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { db } from '../lib/firebase';

const buildSitemap = (siteUrl: string, urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const postsSnapshot = await getDocs(query(collection(db, 'posts'), where('isPublished', '==', true)));
  const blogUrls = postsSnapshot.docs.map((docSnap) => `/blog/${docSnap.data().slug}`);

  const staticPages = [
    '/',
    '/blog',
    '/admin/login',
    '/admin/dashboard',
    '/privacy-policy',
    '/terms-and-conditions',
    '/return-and-refund-policy'
  ];

  const sitemap = buildSitemap(siteUrl, [...staticPages, ...blogUrls]);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default SiteMap;
