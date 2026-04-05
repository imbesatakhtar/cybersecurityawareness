import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { register } from '../services/authService';
import PasswordStrength from '../components/PasswordStrength';
import { HiUser, HiMail, HiLockClosed, HiEye, HiEyeOff, HiShieldCheck, HiUserAdd } from 'react-icons/hi';

const IconBox = ({ children }) => (
  <div className="absolute left-0 top-0 bottom-0 w-11 flex items-center justify-center pointer-events-none">
    {children}
  </div>
);

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill in all required fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match!'); return; }
    setLoading(true);
    try {
      const data = await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      toast.success(`Account created! Welcome, ${data.user.name}!`);
      setTimeout(() => navigate('/dashboard'), 400);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="w-full max-w-[420px]">

        <div className="p-7 sm:p-9 rounded-2xl bg-[rgba(12,12,32,0.85)] backdrop-blur-xl border border-white/[0.06] shadow-2xl">
          {/* Header Icon */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
            className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-purple-500/15 to-cyan-500/15 border border-purple-500/15 flex items-center justify-center">
            <HiUserAdd className="text-2xl text-purple-400" />
          </motion.div>

          <h1 className="text-xl font-bold text-white text-center mb-1">Create Account</h1>
          <p className="text-sm text-slate-400 text-center mb-7">Join the secure platform</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <IconBox><HiUser className="text-slate-500" /></IconBox>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Enter your full name" className="input-field !pl-11" id="signup-name" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <IconBox><HiMail className="text-slate-500" /></IconBox>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com" className="input-field !pl-11" id="signup-email" autoComplete="email" />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Role</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button type="button" onClick={() => set('role', 'user')}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.role === 'user'
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'border-white/[0.06] text-slate-400 hover:border-white/[0.12] hover:text-slate-300'
                  }`}>
                  👤 User
                </button>
                <button type="button" onClick={() => set('role', 'admin')}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.role === 'admin'
                      ? 'border-purple-500/40 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                      : 'border-white/[0.06] text-slate-400 hover:border-white/[0.12] hover:text-slate-300'
                  }`}>
                  🛡️ Admin
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <IconBox><HiLockClosed className="text-slate-500" /></IconBox>
                <input type={show ? 'text' : 'password'} value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Create a strong password" className="input-field !pl-11 !pr-11"
                  id="signup-password" autoComplete="new-password" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
                  {show ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <IconBox><HiLockClosed className="text-slate-500" /></IconBox>
                <input type={show ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  placeholder="Confirm your password" className="input-field !pl-11"
                  id="signup-confirm" autoComplete="new-password" />
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary w-full !mt-6" id="signup-submit">
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <HiShieldCheck />
              )}
              {loading ? 'Creating Account...' : 'Create Secure Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[0.6875rem] text-slate-500">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
