import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout, getStoredUser } from '../services/authService';
import {
  HiShieldCheck, HiMenu, HiX, HiLogout, HiUser,
  HiHome, HiCode, HiAcademicCap, HiViewGrid
} from 'react-icons/hi';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const user = getStoredUser();

  const handleLogout = () => { logout(); navigate('/login'); setOpen(false); };

  const links = [
    { to: '/', label: 'Home', icon: <HiHome /> },
    { to: '/xss-simulator', label: 'XSS Simulator', icon: <HiCode /> },
    { to: '/learn-security', label: 'Learn Security', icon: <HiAcademicCap /> },
    ...(authed ? [{ to: '/dashboard', label: 'Dashboard', icon: <HiViewGrid /> }] : [])
  ];

  const active = (p) => location.pathname === p;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-3 sm:mx-5 mt-3 rounded-2xl border border-white/[0.06] bg-[rgba(6,6,18,0.92)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <HiShieldCheck className="text-cyan-400 text-xl" />
            <span className="font-bold text-[0.9375rem] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SecureAuth
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[0.8125rem] font-medium transition-colors ${active(l.to) ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {active(l.to) && <motion.span layoutId="nav" className="absolute inset-0 rounded-lg bg-cyan-400/10 border border-cyan-400/15" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
                <span className="relative z-10 text-base">{l.icon}</span>
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-2.5">
            {authed ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
                  <HiUser className="text-cyan-400" />
                  <span className="text-slate-300">{user?.name}</span>
                  <span className="badge badge-info">{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-500/15 hover:bg-red-500/8 transition-colors">
                  <HiLogout /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"><button className="btn-ghost !py-1.5 !px-4 !text-[0.8125rem]">Login</button></Link>
                <Link to="/signup"><button className="btn-primary !py-1.5 !px-4 !text-[0.8125rem]">Sign Up</button></Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-xl text-slate-300 hover:text-cyan-400 transition-colors">
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="lg:hidden overflow-hidden border-t border-white/[0.06]">
              <div className="p-3 space-y-1">
                {links.map(l => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${active(l.to) ? 'text-cyan-400 bg-cyan-400/8' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}>
                    <span className="text-base">{l.icon}</span>{l.label}
                  </Link>
                ))}
                <div className="border-t border-white/[0.06] pt-2 mt-2 space-y-1.5">
                  {authed ? (
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/8 w-full">
                      <HiLogout className="text-base" /> Logout
                    </button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setOpen(false)} className="block"><button className="btn-ghost w-full !text-sm">Login</button></Link>
                      <Link to="/signup" onClick={() => setOpen(false)} className="block"><button className="btn-primary w-full !text-sm">Sign Up</button></Link>
                    </>
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
