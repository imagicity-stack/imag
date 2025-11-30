import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { signOut, User } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { withProtectedRoute } from '../../components/auth/withProtectedRoute';
import MarkdownEditor from '../../components/blog/MarkdownEditor';
import Layout from '../../components/layout/Layout';
import { auth, db, storage } from '../../lib/firebase';
import { BlogPost } from '../../types/blog';
import { formatDate, mapFirestorePost, slugifyTitle } from '../../utils';

interface DashboardProps {
  user: User;
}

const emptyForm: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  featuredImageUrl: '',
  category: '',
  tags: [],
  intro: '',
  content: '',
  author: '',
  isPublished: false
};

function Dashboard({ user }: DashboardProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [tagsInput, setTagsInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nextPosts = snapshot.docs.map((docSnap) => mapFirestorePost(docSnap.id, docSnap.data()));
      setPosts(nextPosts);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setTagsInput('');
    setActiveId(null);
    setIsEditing(false);
    setFile(null);
  };

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title') {
      setForm((prev) => ({ ...prev, slug: slugifyTitle(value) }));
    }
  };

  const uploadFeaturedImage = async () => {
    if (!file) return form.featuredImageUrl;
    const storageRef = ref(storage, `featured/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      const featuredImageUrl = await uploadFeaturedImage();
      const payload = {
        ...form,
        featuredImageUrl,
        tags: tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (isEditing && activeId) {
        const docRef = doc(db, 'posts', activeId);
        const { createdAt, ...updateData } = payload;
        await updateDoc(docRef, updateData);
        setStatus('Post updated.');
      } else {
        await addDoc(collection(db, 'posts'), payload);
        setStatus('Post created.');
      }
      resetForm();
    } catch (error: any) {
      console.error(error);
      setStatus(error.message || 'Unable to save post.');
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setActiveId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      featuredImageUrl: post.featuredImageUrl,
      category: post.category,
      tags: post.tags,
      intro: post.intro,
      content: post.content,
      author: post.author,
      isPublished: post.isPublished
    });
    setTagsInput(post.tags.join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await deleteDoc(doc(db, 'posts', id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/admin/login');
  };

  const storagePathHint = useMemo(() => (file ? `${Date.now()}-${file.name}` : ''), [file]);

  return (
    <Layout title="Admin Dashboard" description="Create, edit, and publish IMAGICITY blog posts.">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-aurum">Dashboard</p>
            <h1 className="text-3xl font-bold">Blog manager</h1>
            <p className="text-gray-400 text-sm">Signed in as {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/blog" className="px-4 py-2 rounded-lg border border-gray-700 text-sm hover:border-aurum">
              View blog
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-scarlet text-white font-semibold">
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Slug (auto)</label>
              <input
                type="text"
                value={form.slug}
                readOnly
                className="rounded-xl bg-gray-800 border border-gray-700 px-4 py-3 text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Meta Title</label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Meta Description</label>
              <input
                type="text"
                value={form.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Intro</label>
              <textarea
                value={form.intro}
                onChange={(e) => handleChange('intro', e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-200">Featured image</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {form.featuredImageUrl && <p className="text-xs text-gray-400">Current: {form.featuredImageUrl}</p>}
              {file && <p className="text-xs text-gray-400">Uploading as: featured/{storagePathHint}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => handleChange('isPublished', e.target.checked)}
                className="h-5 w-5"
              />
              <label htmlFor="published" className="text-sm text-gray-200">
                Publish this post
              </label>
            </div>
          </div>

          <MarkdownEditor value={form.content} onChange={(value) => handleChange('content', value)} />

          {status && <p className="text-sm text-aurum">{status}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="px-5 py-3 rounded-xl bg-aurum text-black font-semibold disabled:opacity-60"
            >
              {busy ? 'Saving...' : isEditing ? 'Update post' : 'Create post'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="px-5 py-3 rounded-xl border border-gray-700">
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent posts</h2>
            <p className="text-sm text-gray-400">{posts.length} total</p>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-aurum">{post.category}</p>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-400 text-sm">{formatDate(post.createdAt)}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{post.intro}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 rounded-lg border border-aurum text-aurum text-sm hover:bg-aurum/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-300 text-sm hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withProtectedRoute(Dashboard);
