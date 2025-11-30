import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { auth } from '../../lib/firebase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/admin/dashboard');
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Admin Login" description="Secure admin access to manage IMAGICITY blog posts.">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-aurum mb-4">Admin</p>
          <h1 className="text-3xl font-bold mb-6">Dashboard access</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-aurum text-black font-semibold hover:translate-y-[-1px] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Enter dashboard'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
