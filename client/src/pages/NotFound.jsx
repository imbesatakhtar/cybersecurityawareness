import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiShieldExclamation } from 'react-icons/hi';

const NotFound = () => (
  <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
      className="text-center max-w-sm">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/8 border border-red-500/15 mb-6">
        <HiShieldExclamation className="text-4xl text-red-400" />
      </motion.div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-3">404</h1>
      <h2 className="text-lg font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 mb-7">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/"><button className="btn-primary mx-auto"><HiHome /> Return Home</button></Link>
    </motion.div>
  </div>
);

export default NotFound;
