/**
 * Dashboard Page - User Security Dashboard
 * 
 * Displays:
 * - User profile info
 * - Security statistics (animated cards)
 * - Security tips
 * - Login attempt logs (demo data)
 * 
 * All data is fetched from protected API endpoints (requires JWT).
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import api from '../services/api';
import { getStoredUser } from '../services/authService';
import {
  HiUser, HiShieldCheck, HiUserGroup, HiStatusOnline,
  HiBan, HiChartBar, HiClock, HiLocationMarker
} from 'react-icons/hi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, logsRes, tipsRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/logs'),
          api.get('/dashboard/tips')
        ]);
        setStats(statsRes.data);
        setLogs(logsRes.data);
        setTips(tipsRes.data);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stat cards configuration
  const statCards = stats ? [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: <HiUserGroup />,
      color: 'cyan',
      gradient: 'from-cyan-500/10 to-cyan-500/5',
      border: 'border-cyan-500/20'
    },
    {
      label: 'Active Sessions',
      value: stats.activesessions,
      icon: <HiStatusOnline />,
      color: 'green',
      gradient: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20'
    },
    {
      label: 'Blocked Attempts',
      value: stats.blockedAttempts,
      icon: <HiBan />,
      color: 'red',
      gradient: 'from-red-500/10 to-red-500/5',
      border: 'border-red-500/20'
    },
    {
      label: 'Security Score',
      value: `${stats.securityScore}%`,
      icon: <HiChartBar />,
      color: 'purple',
      gradient: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20'
    }
  ] : [];

  const colorTextMap = {
    cyan: 'text-cyan-400',
    green: 'text-emerald-400',
    red: 'text-red-400',
    purple: 'text-purple-400'
  };

  // Status badge helper
  const getStatusBadge = (status) => {
    const map = {
      success: 'badge badge-success',
      failed: 'badge badge-danger',
      blocked: 'badge badge-warning'
    };
    return map[status] || 'badge badge-info';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-3 border-cyan-500/30 border-t-cyan-500 rounded-full"
          style={{ borderWidth: '3px' }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Security Dashboard</h1>
            <p className="text-slate-400">Welcome back, <span className="text-cyan-400">{user?.name}</span></p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <HiUser className="text-white text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <span className="badge badge-info ml-2">{user?.role}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.border} transition-all duration-300`}
          >
            <div className={`text-2xl mb-3 ${colorTextMap[stat.color]}`}>{stat.icon}</div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-1"
            >
              {stat.value}
            </motion.p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Login Attempt Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl bg-[rgba(10,10,30,0.6)] border border-white/10 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <HiShieldCheck className="text-cyan-400" />
              Security Logs
            </h2>
            <span className="text-xs text-slate-500">Demo Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 hidden md:table-cell">IP Address</th>
                  <th className="px-6 py-3 hidden lg:table-cell">Location</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-3.5 text-sm text-slate-300">{log.action}</td>
                    <td className="px-6 py-3.5 text-sm font-mono text-slate-400">{log.email}</td>
                    <td className="px-6 py-3.5 text-sm font-mono text-slate-500 hidden md:table-cell">{log.ip}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 hidden lg:table-cell">
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="text-xs" />
                        {log.location}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={getStatusBadge(log.status)}>{log.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-[rgba(10,10,30,0.6)] border border-white/10 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">🔒 Security Tips</h2>
          </div>
          <div className="p-4 space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{tip.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tip.description}</p>
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
