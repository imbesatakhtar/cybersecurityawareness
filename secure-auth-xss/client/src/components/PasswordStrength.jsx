/**
 * Password Strength Indicator Component
 * 
 * SECURITY CONCEPT: Password Strength Feedback
 * 
 * Provides real-time visual feedback about password strength.
 * Checks for: length, uppercase, lowercase, numbers, special chars.
 * Encourages users to create strong passwords.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PasswordStrength = ({ password }) => {
  // Calculate password strength score (0-5)
  const analysis = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '', checks: [] };

    let score = 0;
    const checks = [
      { label: 'At least 6 characters', passed: password.length >= 6 },
      { label: 'At least 8 characters', passed: password.length >= 8 },
      { label: 'Contains uppercase (A-Z)', passed: /[A-Z]/.test(password) },
      { label: 'Contains lowercase (a-z)', passed: /[a-z]/.test(password) },
      { label: 'Contains number (0-9)', passed: /[0-9]/.test(password) },
      { label: 'Contains special char (!@#$)', passed: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
    ];

    checks.forEach((check) => {
      if (check.passed) score++;
    });

    // Determine strength level
    let label, color, bgColor;
    if (score <= 1) {
      label = 'Very Weak';
      color = '#ef4444';
      bgColor = 'rgba(239, 68, 68, 0.2)';
    } else if (score <= 2) {
      label = 'Weak';
      color = '#f97316';
      bgColor = 'rgba(249, 115, 22, 0.2)';
    } else if (score <= 3) {
      label = 'Fair';
      color = '#f59e0b';
      bgColor = 'rgba(245, 158, 11, 0.2)';
    } else if (score <= 4) {
      label = 'Good';
      color = '#22c55e';
      bgColor = 'rgba(34, 197, 94, 0.2)';
    } else {
      label = 'Strong';
      color = '#10b981';
      bgColor = 'rgba(16, 185, 129, 0.2)';
    }

    return { score, label, color, bgColor, checks };
  }, [password]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 space-y-3"
    >
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Password Strength</span>
          <span className="text-xs font-semibold" style={{ color: analysis.color }}>
            {analysis.label}
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(analysis.score / 6) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: analysis.color }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-1.5">
        {analysis.checks.map((check, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-1.5"
          >
            <span className={`text-xs ${check.passed ? 'text-green-400' : 'text-slate-600'}`}>
              {check.passed ? '✓' : '○'}
            </span>
            <span className={`text-xs ${check.passed ? 'text-slate-300' : 'text-slate-600'}`}>
              {check.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PasswordStrength;
