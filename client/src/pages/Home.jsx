import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import { HiShieldCheck, HiCode, HiLockClosed, HiAcademicCap, HiArrowRight } from 'react-icons/hi';

const features = [
  { icon: <HiLockClosed />, title: 'Secure Authentication', desc: 'JWT-based login system with bcrypt password hashing, role-based access, and secure session management.', color: 'cyan', link: '/login' },
  { icon: <HiCode />, title: 'XSS Attack Simulator', desc: 'Interactive demo showing how Cross-Site Scripting works and how to prevent it with input sanitization.', color: 'purple', link: '/xss-simulator' },
  { icon: <HiAcademicCap />, title: 'Learn Security', desc: 'Educational module covering XSS, JWT auth, password hashing, and OWASP Top 10 security concepts.', color: 'emerald', link: '/learn-security' }
];

const colors = {
  cyan: { card: 'border-cyan-500/15 hover:border-cyan-500/30', icon: 'text-cyan-400', glow: 'hover:shadow-cyan-500/8' },
  purple: { card: 'border-purple-500/15 hover:border-purple-500/30', icon: 'text-purple-400', glow: 'hover:shadow-purple-500/8' },
  emerald: { card: 'border-emerald-500/15 hover:border-emerald-500/30', icon: 'text-emerald-400', glow: 'hover:shadow-emerald-500/8' }
};

const Home = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <section className="text-center py-16 sm:py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-cyan-500/[0.04] blur-[100px] pointer-events-none" />

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/8 border border-cyan-500/15 text-cyan-400 text-xs font-medium mb-8">
        <HiShieldCheck className="text-sm" /> BCA CyberSecurity Project
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
        <span className="text-white">Secure Auth +</span><br />
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">XSS Simulator</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        An educational cybersecurity web application demonstrating real-world
        authentication security and XSS attack prevention using modern web technologies.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/xss-simulator"><button className="btn-primary w-full sm:w-auto">Try XSS Simulator <HiArrowRight /></button></Link>
        <Link to="/learn-security"><button className="btn-ghost w-full sm:w-auto">Learn Security Concepts</button></Link>
      </motion.div>
    </section>

    <motion.section variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16 sm:pb-20">
      {features.map((f, i) => {
        const c = colors[f.color];
        return (
          <motion.div key={i} variants={staggerItem}>
            <Link to={f.link}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                className={`h-full p-6 sm:p-8 rounded-2xl bg-[rgba(12,12,32,0.6)] border ${c.card} ${c.glow} hover:shadow-xl transition-all duration-300`}>
                <div className={`text-2xl mb-4 ${c.icon}`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{f.desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.icon}`}>Explore <HiArrowRight className="text-xs" /></span>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.section>

    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="text-center pb-20">
      <h2 className="text-lg font-semibold text-white mb-6">Built With</h2>
      <div className="flex flex-wrap justify-center gap-2.5">
        {['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Framer Motion'].map(t => (
          <motion.span key={t} whileHover={{ scale: 1.08, y: -2 }}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06] hover:text-cyan-400 hover:border-cyan-500/20 transition-all cursor-default">
            {t}
          </motion.span>
        ))}
      </div>
    </motion.section>
  </div>
);

export default Home;
