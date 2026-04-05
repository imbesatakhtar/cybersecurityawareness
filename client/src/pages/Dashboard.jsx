import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import api from '../services/api';
import { getStoredUser } from '../services/authService';
import { HiUser, HiShieldCheck, HiUserGroup, HiStatusOnline, HiBan, HiChartBar, HiLocationMarker } from 'react-icons/hi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    const fetch = async () => {
      try {
        const [s, l, t] = await Promise.all([api.get('/dashboard/stats'), api.get('/dashboard/logs'), api.get('/dashboard/tips')]);
        setStats(s.data); setLogs(l.data); setTips(t.data);
      } catch (e) { console.error('Dashboard fetch error:', e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: <HiUserGroup />, color: 'cyan' },
    { label: 'Active Sessions', value: stats.activesessions, icon: <HiStatusOnline />, color: 'emerald' },
    { label: 'Blocked Attempts', value: stats.blockedAttempts, icon: <HiBan />, color: 'red' },
    { label: 'Security Score', value: `${stats.securityScore}%`, icon: <HiChartBar />, color: 'purple' }
  ] : [];

  const colorMap = { cyan: 'text-cyan-400 border-cyan-500/15 bg-cyan-500/[0.06]', emerald: 'text-emerald-400 border-emerald-500/15 bg-emerald-500/[0.06]', red: 'text-red-400 border-red-500/15 bg-red-500/[0.06]', purple: 'text-purple-400 border-purple-500/15 bg-purple-500/[0.06]' };
  const statusBadge = (s) => ({ success: 'badge badge-success', failed: 'badge badge-danger', blocked: 'badge badge-warning' }[s] || 'badge badge-info');

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-[3px] border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Security Dashboard</h1>
            <p className="text-sm text-slate-400">Welcome back, <span className="text-cyan-400">{user?.name}</span></p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <HiUser className="text-white text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <span className="badge badge-info ml-1">{user?.role}</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div key={i} variants={staggerItem} whileHover={{ y: -3 }}
            className={`p-4 sm:p-5 rounded-2xl border ${colorMap[s.color]} transition-all`}>
            <div className="text-xl mb-2">{s.icon}</div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">
        
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl bg-[rgba(12,12,32,0.6)] border border-white/[0.06] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2"><HiShieldCheck className="text-cyan-400" /> Security Logs</h2>
            <span className="text-[0.6875rem] text-slate-500">Demo Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.6875rem] text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-2.5">Action</th><th className="px-5 py-2.5">Email</th>
                  <th className="px-5 py-2.5 hidden md:table-cell">IP</th>
                  <th className="px-5 py-2.5 hidden lg:table-cell">Location</th>
                  <th className="px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.04 }}
                    className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 text-sm text-slate-300">{l.action}</td>
                    <td className="px-5 py-3 text-sm font-mono text-slate-400 truncate max-w-[140px]">{l.email}</td>
                    <td className="px-5 py-3 text-sm font-mono text-slate-500 hidden md:table-cell">{l.ip}</td>
                    <td className="px-5 py-3 text-sm text-slate-500 hidden lg:table-cell"><span className="flex items-center gap-1"><HiLocationMarker className="text-xs" />{l.location}</span></td>
                    <td className="px-5 py-3"><span className={statusBadge(l.status)}>{l.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-2xl bg-[rgba(12,12,32,0.6)] border border-white/[0.06] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">🔒 Security Tips</h2>
          </div>
          <div className="p-3 space-y-2.5">
            {tips.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                whileHover={{ x: 3 }}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/15 transition-all cursor-default">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg shrink-0">{t.icon}</span>
                  <div>
                    <h3 className="text-xs font-semibold text-white mb-0.5">{t.title}</h3>
                    <p className="text-[0.6875rem] text-slate-400 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
