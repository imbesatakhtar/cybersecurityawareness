import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import { HiAcademicCap, HiCode, HiKey, HiLockClosed, HiShieldCheck, HiChevronDown, HiChevronUp, HiExternalLink } from 'react-icons/hi';

const sections = [
  {
    icon: <HiCode />, title: 'Cross-Site Scripting (XSS)', color: 'red',
    content: [
      { sub: 'What is XSS?', text: 'Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.' },
      { sub: 'How does it work?', text: 'When a website displays user input without sanitization, an attacker can submit malicious code. Other users\' browsers execute it, potentially stealing cookies, session tokens, or data.' },
      { sub: 'Types of XSS', list: ['Stored XSS — Script permanently stored on the server', 'Reflected XSS — Script reflected in error messages or URL parameters', 'DOM-based XSS — Vulnerability in client-side code'] },
      { sub: 'Prevention', list: ['Sanitize and validate user input', 'Use Content Security Policy (CSP) headers', 'Encode output data before displaying', 'Use DOMPurify for HTML sanitization', 'Avoid dangerouslySetInnerHTML in React'] }
    ]
  },
  {
    icon: <HiKey />, title: 'JWT Authentication', color: 'cyan',
    content: [
      { sub: 'What is JWT?', text: 'JSON Web Token is a compact, self-contained way to securely transmit information between parties as a JSON object. Widely used for authentication.' },
      { sub: 'How JWT Works', list: ['User sends credentials to server', 'Server verifies and generates a JWT token', 'Client stores token and sends it with requests', 'Server verifies token before processing'] },
      { sub: 'JWT Structure', text: 'A JWT has three parts: Header (algorithm), Payload (user data/claims), and Signature (ensures integrity). Never store sensitive data in the payload.' },
      { sub: 'Best Practices', list: ['Use strong secret keys', 'Set appropriate expiration times', 'Use HTTPS to prevent interception', 'Implement token refresh mechanisms'] }
    ]
  },
  {
    icon: <HiLockClosed />, title: 'Password Hashing', color: 'purple',
    content: [
      { sub: 'Why Hash?', text: 'Storing plain-text passwords is extremely dangerous. Hashing converts passwords into irreversible fixed-length strings that cannot be reversed.' },
      { sub: 'How bcrypt Works', list: ['Designed to be slow and computationally expensive', 'Generates unique salt for each password', 'Cost factor controls hashing speed', 'Same password produces different hashes'] },
      { sub: 'Verification', text: 'When logging in, bcrypt hashes the entered password with the stored salt and compares hashes. The actual password is never stored or compared.' },
      { sub: 'Mistakes to Avoid', list: ['Never store plain-text passwords', 'Don\'t use MD5 or SHA-1', 'Always use proven libraries like bcrypt or Argon2', 'Enforce minimum password complexity'] }
    ]
  },
  {
    icon: <HiShieldCheck />, title: 'OWASP Top 10', color: 'emerald',
    content: [
      { sub: 'What is OWASP?', text: 'The Open Web Application Security Project is a nonprofit focused on improving software security. Their Top 10 identifies the most critical web application security risks.' },
      { sub: 'Top 10 (2021)', list: ['A01: Broken Access Control', 'A02: Cryptographic Failures', 'A03: Injection (SQL, XSS)', 'A04: Insecure Design', 'A05: Security Misconfiguration', 'A06: Vulnerable Components', 'A07: Authentication Failures', 'A08: Data Integrity Failures', 'A09: Logging Failures', 'A10: Server-Side Request Forgery'] },
      { sub: 'This Project Addresses', list: ['A03: XSS Simulator', 'A07: JWT + bcrypt auth', 'A02: Password hashing', 'A05: CORS config, env variables'] }
    ]
  }
];

const colorClasses = {
  red:     { border: 'border-red-500/15', bg: 'bg-red-500/[0.04]', icon: 'text-red-400', bullet: 'text-red-400' },
  cyan:    { border: 'border-cyan-500/15', bg: 'bg-cyan-500/[0.04]', icon: 'text-cyan-400', bullet: 'text-cyan-400' },
  purple:  { border: 'border-purple-500/15', bg: 'bg-purple-500/[0.04]', icon: 'text-purple-400', bullet: 'text-purple-400' },
  emerald: { border: 'border-emerald-500/15', bg: 'bg-emerald-500/[0.04]', icon: 'text-emerald-400', bullet: 'text-emerald-400' }
};

const LearnSecurity = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 text-xs font-medium mb-4">
          <HiAcademicCap /> Cybersecurity Learning Module
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Learn <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Security Concepts</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">Understand the cybersecurity concepts used in this project. Written for BCA students.</p>
      </motion.div>

      {/* Accordion */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
        {sections.map((s, idx) => {
          const c = colorClasses[s.color];
          return (
            <motion.div key={idx} variants={staggerItem} className={`rounded-2xl border ${c.border} overflow-hidden`}>
              <button onClick={() => setOpen(open === idx ? -1 : idx)}
                className={`w-full px-4 sm:px-5 py-4 flex items-center gap-3 ${c.bg} hover:brightness-110 transition-all`}>
                <span className={`text-xl shrink-0 ${c.icon}`}>{s.icon}</span>
                <span className="text-sm sm:text-base font-semibold text-white flex-1 text-left">{s.title}</span>
                {open === idx ? <HiChevronUp className="text-slate-400 shrink-0" /> : <HiChevronDown className="text-slate-400 shrink-0" />}
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="p-4 sm:p-5 bg-[rgba(6,6,15,0.8)] space-y-4">
                      {s.content.map((block, j) => (
                        <motion.div key={j} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.08 }}>
                          <h3 className={`text-xs font-semibold ${c.icon} mb-1.5`}>{block.sub}</h3>
                          {block.text && <p className="text-sm text-slate-300 leading-relaxed">{block.text}</p>}
                          {block.list && (
                            <ul className="space-y-1.5 mt-1">
                              {block.list.map((item, k) => (
                                <li key={k} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                                  <span className={`${c.bullet} mt-1 text-[0.6rem] shrink-0`}>▸</span>{item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Resources */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="text-center mt-8 mb-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-3">📚 Want to Learn More?</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[{ label: 'OWASP.org', url: 'https://owasp.org/www-project-top-ten/' },
            { label: 'JWT.io', url: 'https://jwt.io/' },
            { label: 'MDN Web Security', url: 'https://developer.mozilla.org/en-US/docs/Web/Security' }
          ].map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium text-cyan-400 border border-cyan-500/15 hover:bg-cyan-500/8 hover:border-cyan-500/30 transition-all">
              {l.label} <HiExternalLink className="text-[0.6rem]" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LearnSecurity;
