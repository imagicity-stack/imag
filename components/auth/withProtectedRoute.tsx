import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';

export function withProtectedRoute<P extends object>(Component: React.ComponentType<P & { user: User }>) {
  return function ProtectedRouteWrapper(props: P) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          router.replace('/admin/login');
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-night text-gray-200">
          <p className="text-lg font-semibold">Checking credentials...</p>
        </div>
      );
    }

    if (!user) return null;

    return <Component {...props} user={user} />;
  };
}
