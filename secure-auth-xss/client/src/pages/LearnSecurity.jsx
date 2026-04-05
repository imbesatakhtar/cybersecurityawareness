/**
 * Learn Security Page
 * 
 * Educational page explaining cybersecurity concepts:
 * - Cross-Site Scripting (XSS)
 * - JWT Authentication
 * - Password Hashing
 * - OWASP Top 10 Basics
 * 
 * Written in simple BCA-level language for easy understanding.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import {
  HiAcademicCap, HiCode, HiKey, HiLockClosed,
  HiShieldCheck, HiChevronDown, HiChevronUp, HiExternalLink
} from 'react-icons/hi';

const LearnSecurity = () => {
  const [openSection, setOpenSection] = useState(0);

  const sections = [
    {
      id: 0,
      icon: <HiCode className="text-2xl" />,
      title: 'Cross-Site Scripting (XSS)',
      color: 'red',
      gradient: 'from-red-500/10 to-orange-500/5',
      border: 'border-red-500/20',
      iconColor: 'text-red-400',
      content: [
        {
          subtitle: 'What is XSS?',
          text: 'Cross-Site Scripting (XSS) is a type of security vulnerability commonly found in web applications. It allows attackers to inject malicious scripts (usually JavaScript) into web pages that are viewed by other users.'
        },
        {
          subtitle: 'How does it work?',
          text: 'When a website displays user input without proper sanitization, an attacker can submit malicious code. When other users view that page, the injected script runs in their browser, potentially stealing cookies, session tokens, or personal data.'
        },
        {
          subtitle: 'Types of XSS',
          list: [
            'Stored XSS — Malicious script is permanently stored on the server (e.g., in a database) and served to users.',
            'Reflected XSS — The script is reflected off the server in error messages, search results, or URL parameters.',
            'DOM-based XSS — The vulnerability exists in the client-side code rather than on the server side.'
          ]
        },
        {
          subtitle: 'Prevention Methods',
          list: [
            'Always sanitize and validate user input',
            'Use Content Security Policy (CSP) headers',
            'Encode output data before displaying',
            'Use libraries like DOMPurify for HTML sanitization',
            'Avoid using dangerouslySetInnerHTML in React'
          ]
        }
      ]
    },
    {
      id: 1,
      icon: <HiKey className="text-2xl" />,
      title: 'JWT Authentication',
      color: 'cyan',
      gradient: 'from-cyan-500/10 to-blue-500/5',
      border: 'border-cyan-500/20',
      iconColor: 'text-cyan-400',
      content: [
        {
          subtitle: 'What is JWT?',
          text: 'JSON Web Token (JWT) is a compact, self-contained way to securely transmit information between parties as a JSON object. It is widely used for authentication in modern web applications.'
        },
        {
          subtitle: 'How JWT Works',
          list: [
            'User sends login credentials (email + password) to the server',
            'Server verifies credentials and generates a JWT token',
            'Token is sent back to the client and stored (localStorage/cookies)',
            'Client sends the token with every subsequent request in the Authorization header',
            'Server verifies the token before processing the request'
          ]
        },
        {
          subtitle: 'JWT Structure',
          text: 'A JWT consists of three parts separated by dots: Header.Payload.Signature. The Header contains the token type and algorithm. The Payload contains claims (user data). The Signature ensures the token hasn\'t been tampered with.'
        },
        {
          subtitle: 'Security Best Practices',
          list: [
            'Use strong secret keys for signing tokens',
            'Set appropriate expiration times',
            'Don\'t store sensitive data in the JWT payload',
            'Use HTTPS to prevent token interception',
            'Implement token refresh mechanisms'
          ]
        }
      ]
    },
    {
      id: 2,
      icon: <HiLockClosed className="text-2xl" />,
      title: 'Password Hashing',
      color: 'purple',
      gradient: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20',
      iconColor: 'text-purple-400',
      content: [
        {
          subtitle: 'Why Hash Passwords?',
          text: 'Storing passwords as plain text is extremely dangerous. If the database is compromised, all user passwords are exposed. Hashing converts passwords into a fixed-length string of characters that cannot be reversed back to the original password.'
        },
        {
          subtitle: 'How bcrypt Works',
          list: [
            'bcrypt is a password hashing function designed to be slow and computationally expensive',
            'It automatically generates a salt (random data) that is added to the password before hashing',
            'The "cost factor" (rounds) determines how slow the hashing is — more rounds = more secure but slower',
            'Even if two users have the same password, their hashes will be different due to unique salts'
          ]
        },
        {
          subtitle: 'Password Verification Process',
          text: 'When a user logs in, bcrypt hashes the entered password with the same salt stored in the hash, then compares the two hashes. If they match, the password is correct. The actual password is never stored or compared directly.'
        },
        {
          subtitle: 'Common Mistakes to Avoid',
          list: [
            'Never store passwords in plain text',
            'Don\'t use simple hashing algorithms like MD5 or SHA-1',
            'Don\'t create your own hashing algorithm',
            'Always use a proven library like bcrypt or Argon2',
            'Enforce minimum password length and complexity'
          ]
        }
      ]
    },
    {
      id: 3,
      icon: <HiShieldCheck className="text-2xl" />,
      title: 'OWASP Top 10 Basics',
      color: 'green',
      gradient: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
      content: [
        {
          subtitle: 'What is OWASP?',
          text: 'The Open Web Application Security Project (OWASP) is a nonprofit organization focused on improving software security. Their Top 10 list identifies the most critical web application security risks.'
        },
        {
          subtitle: 'OWASP Top 10 (2021)',
          list: [
            'A01: Broken Access Control — Users can act outside their intended permissions',
            'A02: Cryptographic Failures — Sensitive data exposed due to weak encryption',
            'A03: Injection — Untrusted data sent to an interpreter (SQL, XSS, etc.)',
            'A04: Insecure Design — Missing security controls in application architecture',
            'A05: Security Misconfiguration — Default configs, unnecessary features enabled',
            'A06: Vulnerable Components — Using outdated libraries with known vulnerabilities',
            'A07: Authentication Failures — Weak login systems, session management issues',
            'A08: Software & Data Integrity Failures — Untrusted updates, CI/CD issues',
            'A09: Security Logging Failures — Insufficient monitoring and alerting',
            'A10: Server-Side Request Forgery (SSRF) — Server tricked into making requests'
          ]
        },
        {
          subtitle: 'How This Project Addresses OWASP',
          list: [
            'A03 (Injection): XSS Simulator demonstrates injection prevention',
            'A07 (Auth Failures): Secure JWT + bcrypt authentication system',
            'A02 (Crypto): Password hashing with bcrypt salt rounds',
            'A05 (Misconfig): CORS configuration, environment variables for secrets'
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
          <HiAcademicCap />
          Cybersecurity Learning Module
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
          Learn <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Security Concepts</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
          Understand the fundamental cybersecurity concepts used in this project.
          Written in simple language for BCA students.
        </p>
      </motion.div>

      {/* Accordion Sections */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        {sections.map((section) => (
          <motion.div
            key={section.id}
            variants={staggerItem}
            className={`rounded-2xl border ${section.border} overflow-hidden transition-all duration-300`}
          >
            {/* Section Header (clickable) */}
            <button
              onClick={() => setOpenSection(openSection === section.id ? -1 : section.id)}
              className={`w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 bg-gradient-to-r ${section.gradient} hover:bg-opacity-80 transition-all`}
            >
              <div className={`${section.iconColor} shrink-0`}>{section.icon}</div>
              <h2 className="text-base sm:text-lg font-semibold text-white flex-1 text-left">{section.title}</h2>
              {openSection === section.id ? (
                <HiChevronUp className="text-slate-400 text-xl" />
              ) : (
                <HiChevronDown className="text-slate-400 text-xl" />
              )}
            </button>

            {/* Section Content (expandable) */}
            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-6 bg-[rgba(10,10,30,0.85)] space-y-4 sm:space-y-5">
                    {section.content.map((block, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h3 className={`text-sm font-semibold ${section.iconColor} mb-2`}>
                          {block.subtitle}
                        </h3>
                        {block.text && (
                          <p className="text-sm text-slate-300 leading-relaxed">{block.text}</p>
                        )}
                        {block.list && (
                          <ul className="space-y-2 mt-2">
                            {block.list.map((item, i) => (
                              <li key={i} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                                <span className={`${section.iconColor} mt-1 text-xs shrink-0`}>▸</span>
                                {item}
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
        ))}
      </motion.div>

      {/* Resources Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8 sm:mt-10 mb-8 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-3">📚 Want to Learn More?</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'OWASP.org', url: 'https://owasp.org/www-project-top-ten/' },
            { label: 'JWT.io', url: 'https://jwt.io/' },
            { label: 'MDN Web Security', url: 'https://developer.mozilla.org/en-US/docs/Web/Security' }
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
            >
              {link.label}
              <HiExternalLink className="text-xs" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LearnSecurity;
