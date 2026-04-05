import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { login } from '../services/authService';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiShieldCheck } from 'react-icons/hi';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const data = await login(form);
      toast.success(`Welcome back, ${data.user.name}!`);
      setTimeout(() => navigate(from, { replace: true }), 400);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="w-full max-w-[420px]">

        <div className="p-7 sm:p-9 rounded-2xl bg-[rgba(12,12,32,0.85)] backdrop-blur-xl border border-white/[0.06] shadow-2xl">
          {/* Header Icon */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
            className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/15 flex items-center justify-center">
            <HiShieldCheck className="text-2xl text-cyan-400" />
          </motion.div>

          <h1 className="text-xl font-bold text-white text-center mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-400 text-center mb-7">Sign in to your secure account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none">
                  <HiMail className="text-slate-500" />
                </div>
                <input type="email" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="you@example.com"
                  className="input-field !pl-11"
                  id="login-email" autoComplete="email" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none">
                  <HiLockClosed className="text-slate-500" />
                </div>
                <input type={show ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="Enter your password"
                  className="input-field !pl-11 !pr-11"
                  id="login-password" autoComplete="current-password" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
                  {show ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2" id="login-submit">
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <HiLockClosed />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[0.6875rem] text-slate-500">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Create Account
            </Link>
          </p>
        </div>

        {/* Security badge */}
        <p className="text-center mt-5 text-[0.6875rem] text-slate-500 flex items-center justify-center gap-1.5">
          <HiLockClosed className="text-emerald-500" />
          Protected with JWT Authentication & bcrypt Hashing
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
