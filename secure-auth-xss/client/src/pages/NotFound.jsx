/**
 * 404 Not Found Page
 * 
 * Displayed when users navigate to a route that doesn't exist.
 * Includes animated visuals and a link back to home.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiShieldExclamation } from 'react-icons/hi';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 mb-8"
        >
          <HiShieldExclamation className="text-5xl text-red-400" />
        </motion.div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the URL or return to safety.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glow flex items-center gap-2 mx-auto"
          >
            <HiHome />
            Return to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
