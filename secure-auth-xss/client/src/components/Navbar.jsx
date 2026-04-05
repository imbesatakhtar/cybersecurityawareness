/**
 * Navbar Component - Animated Navigation Bar
 * 
 * Features:
 * - Glassmorphism styling
 * - Active route highlighting
 * - Animated with Framer Motion
 * - Responsive mobile menu
 * - Logout functionality
 */

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout, getStoredUser } from '../services/authService';
import { 
  HiShieldCheck, HiMenu, HiX, HiLogout, HiUser,
  HiHome, HiCode, HiAcademicCap, HiViewGrid 
} from 'react-icons/hi';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getStoredUser();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileOpen(false);
  };

  // Navigation links configuration
  const navLinks = [
    { path: '/', label: 'Home', icon: <HiHome /> },
    { path: '/xss-simulator', label: 'XSS Simulator', icon: <HiCode /> },
    { path: '/learn-security', label: 'Learn Security', icon: <HiAcademicCap /> },
    ...(authenticated ? [{ path: '/dashboard', label: 'Dashboard', icon: <HiViewGrid /> }] : [])
  ];

  // Check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism background */}
      <div className="mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-2xl border border-white/10 bg-[rgba(10,10,26,0.9)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-2xl text-cyan-400"
            >
              <HiShieldCheck />
            </motion.div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SecureAuth
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {/* Active indicator */}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-cyan-400/10 border border-cyan-400/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 text-lg">{link.icon}</span>
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Info */}
          <div className="hidden lg:flex items-center gap-3">
            {authenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <HiUser className="text-cyan-400" />
                  <span className="text-sm text-slate-300">{user?.name || 'User'}</span>
                  <span className="badge badge-info text-[10px] ml-1">{user?.role || 'user'}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all duration-300"
                >
                  <HiLogout />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-2xl text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isMobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
                
                <div className="border-t border-white/10 pt-3 mt-3">
                  {authenticated ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 mb-2">
                        <HiUser className="text-cyan-400" />
                        <span className="text-sm text-slate-300">{user?.name}</span>
                        <span className="badge badge-info text-[10px] ml-1">{user?.role}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 w-full"
                      >
                        <HiLogout className="text-lg" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={() => setIsMobileOpen(false)} className="block">
                        <button className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-300 border border-white/10">
                          Login
                        </button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileOpen(false)} className="block">
                        <button className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600">
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
