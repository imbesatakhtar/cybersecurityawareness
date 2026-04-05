/**
 * Main Layout Component
 * 
 * Wraps all pages with:
 * - Animated Navbar
 * - Page transition animations via AnimatePresence
 * - Consistent padding/spacing
 * - Toast notification provider
 */

import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050510]">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 15, 35, 0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#050510'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#050510'
            }
          }
        }}
      />

      {/* Navigation Bar */}
      <Navbar />

      {/* Page Content with Transitions */}
      <main className="pt-28 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
