/**
 * Home Page - Landing Page
 * 
 * The main landing page of the application with:
 * - Hero section with animated text
 * - Feature cards
 * - Call-to-action buttons
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import { HiShieldCheck, HiCode, HiLockClosed, HiAcademicCap, HiArrowRight } from 'react-icons/hi';

const Home = () => {
  const features = [
    {
      icon: <HiLockClosed className="text-3xl" />,
      title: 'Secure Authentication',
      description: 'JWT-based login system with bcrypt password hashing, role-based access, and secure session management.',
      color: 'cyan',
      link: '/login'
    },
    {
      icon: <HiCode className="text-3xl" />,
      title: 'XSS Attack Simulator',
      description: 'Interactive demo showing how Cross-Site Scripting works and how to prevent it with input sanitization.',
      color: 'purple',
      link: '/xss-simulator'
    },
    {
      icon: <HiAcademicCap className="text-3xl" />,
      title: 'Learn Security',
      description: 'Educational module covering XSS, JWT auth, password hashing, and OWASP Top 10 security concepts.',
      color: 'green',
      link: '/learn-security'
    }
  ];

  const colorMap = {
    cyan: {
      bg: 'from-cyan-500/10 to-cyan-500/5',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      icon: 'text-cyan-400',
      shadow: 'hover:shadow-cyan-500/10'
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      icon: 'text-purple-400',
      shadow: 'hover:shadow-purple-500/10'
    },
    green: {
      bg: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      icon: 'text-emerald-400',
      shadow: 'hover:shadow-emerald-500/10'
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 sm:py-16 md:py-24 relative"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
        >
          <HiShieldCheck className="text-lg" />
          BCA Final Year Cybersecurity Project
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          <span className="text-white">Secure Auth +</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            XSS Simulator
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          An educational cybersecurity web application demonstrating real-world
          authentication security and XSS attack prevention using modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <Link to="/xss-simulator" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Try XSS Simulator
              <HiArrowRight />
            </motion.button>
          </Link>
          <Link to="/learn-security" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-slate-300 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300"
            >
              Learn Security Concepts
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pb-12 sm:pb-16"
      >
        {features.map((feature, index) => {
          const colors = colorMap[feature.color];
          return (
            <motion.div key={index} variants={staggerItem}>
              <Link to={feature.link}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.shadow} hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <div className={`${colors.icon} mb-4`}>{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  <div className={`mt-4 sm:mt-5 flex items-center gap-2 text-sm font-medium ${colors.icon}`}>
                    Explore
                    <HiArrowRight />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center pb-16 sm:pb-20"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Built With</h2>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1, y: -3 }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
