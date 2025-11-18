'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = sessionStorage.getItem('adminAuth');
      if (!adminAuth || adminAuth !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF4E3]">
        <div className="text-[#234433] text-xl font-serif">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '🍰' },
    { name: 'Orders', path: '/admin/orders', icon: '📦' },
    { name: 'Categories', path: '/admin/categories', icon: '📁' },
  ];

  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#234433] to-[#1a3329] shadow-2xl z-10 border-r-2 border-[#E7BD8B]/20">
        <div className="p-6 border-b border-[#E7BD8B]/20">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <img
              src="/LOGO/halwaiiii-01.png"
              alt="Halwaiii Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-serif text-[#E7BD8B] text-center">Admin Portal</h1>
          <p className="text-sm text-[#FDF4E3]/70 mt-1 text-center">Management Panel</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    pathname === item.path
                      ? 'bg-[#E7BD8B] text-[#234433] font-semibold shadow-lg transform scale-105'
                      : 'text-[#FDF4E3] hover:bg-[#E7BD8B]/20 hover:text-[#E7BD8B]'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E7BD8B]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-900/30 text-red-200 rounded-xl hover:bg-red-900/50 transition-all duration-300 border border-red-800/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b-2 border-[#E7BD8B]/30 p-4 sticky top-0 z-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-[#234433]">
              {menuItems.find((item) => item.path === pathname)?.name || 'Admin Panel'}
            </h2>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#234433] hover:bg-[#1a3329] text-white rounded-lg font-medium transition-all duration-300 shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Store</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
