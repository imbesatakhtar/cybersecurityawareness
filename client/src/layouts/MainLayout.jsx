import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { HiShieldCheck } from 'react-icons/hi';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#06060f]">
      <Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: { background: 'rgba(12,12,32,0.95)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', borderRadius: '12px', fontSize: '14px', padding: '12px 16px' },
        success: { iconTheme: { primary: '#10b981', secondary: '#06060f' } },
        error:   { iconTheme: { primary: '#ef4444', secondary: '#06060f' } }
      }} />

      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16">
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HiShieldCheck className="text-cyan-500 text-sm" />
            <span>Secure Auth + XSS Simulator — BCA Final Year Project</span>
          </div>
          <span>Built with React, Node.js, MongoDB & 💙</span>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
