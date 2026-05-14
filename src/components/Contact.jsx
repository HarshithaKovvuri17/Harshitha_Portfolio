import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, Database, ArrowUpRight } from 'lucide-react';

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2"
    fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2"
    fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Magnetic Button state and physics
  const magnetRef = useRef(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  const handleMagnetMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const btn = magnetRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const dist = Math.hypot(dx, dy);

    // Magnetic radius of 130px
    if (dist < 135) {
      setMagnetPos({ x: dx * 0.35, y: dy * 0.35 });
    } else {
      setMagnetPos({ x: 0, y: 0 });
    }
  };

  const handleMagnetLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    // Build pre-filled mailto link with form data
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Hi Harshitha,\n\nYou have a new message from your portfolio contact form.\n\n` +
        `──────────────────────\n` +
        `Sender: ${formState.name}\n` +
        `Email:  ${formState.email}\n` +
        `──────────────────────\n\n` +
        `${formState.message}\n\n` +
        `— Sent via Neural Portfolio`
      );
      window.open(
        `mailto:harshitahanisha@gmail.com?subject=${subject}&body=${body}`,
        '_blank'
      );

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });

      // Auto-hide success alert after 5s
      setTimeout(() => setIsSuccess(false), 5000);
    }, 900);
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/HarshithaKovvuri17",
      icon: Github,
      color: "text-accent-cyan hover:border-accent-cyan/40",
      glow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/kovvuri-harshitha",
      icon: Linkedin,
      color: "text-blue-500 hover:border-blue-500/40",
      glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
    },
    {
      name: "Snowflake Credential",
      href: "https://www.credly.com/badges/e85fbe77-8495-4eb4-b97c-dfce5e7ef270", // Example link format
      icon: Database,
      color: "text-purple-400 hover:border-purple-400/40",
      glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute bottom-0 right-1/4 w-[25rem] h-[25rem] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm font-mono text-accent-cyan uppercase tracking-widest mb-3">05. INQUIRIES</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Let's Build Something <span className="text-gradient-cyan-amber">Together</span>
        </h3>
        <p className="max-w-xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
          Open to enterprise integration opportunities, data analysis roles, full-stack consulting, and technical internships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
        
        {/* Left Column: CTAs, Magnetic Button, Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
          <div>
            <h4 className="text-lg font-display font-semibold text-white tracking-wide mb-4">
              Direct Connection Channels
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Click the magnetic node below to send me a direct email pipeline query or connect across professional networks.
            </p>

            {/* Magnetic Email CTA Button */}
            <div className="h-36 flex items-center justify-start">
              <motion.a
                ref={magnetRef}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                animate={{ x: magnetPos.x, y: magnetPos.y }}
                transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.8 }}
                href="mailto:harshitahanisha@gmail.com"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-panel border border-accent-cyan/30 bg-accent-cyan/5 flex flex-col items-center justify-center text-center group transition-colors duration-300 hover:border-accent-cyan hover:bg-accent-cyan/10 shadow-[0_0_20px_rgba(0,240,255,0.08)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
              >
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-accent-cyan mb-1.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  Ping Node
                </span>
                <span className="text-[8px] font-mono text-gray-500">
                  (Email)
                </span>
              </motion.a>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="space-y-4">
            <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Digital Footprint</h5>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md transition-all duration-300 group ${social.color} ${social.glow}`}
                >
                  <div className="flex items-center gap-3">
                    <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                    <span className="text-xs sm:text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: In-Page Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
            <h4 className="text-lg font-display font-semibold text-white tracking-wide mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>Transmit Secure Message</span>
            </h4>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Sender Identity
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white font-sans text-sm placeholder-gray-600 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Callback Endpoint (Email)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="e.g. j.doe@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white font-sans text-sm placeholder-gray-600 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Payload (Message)
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Input inquiry specs or collaboration plans here..."
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white font-sans text-sm placeholder-gray-600 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg bg-gradient-to-r from-accent-cyan to-blue-600 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] text-black font-semibold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated success alert */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-mono"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email Client Opened!</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Your message was pre-filled — just hit Send in your email app.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* Footer credits inside contact section */}
      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-mono text-gray-500">
        <p>© 2026 Kovvuri Harshitha. All Rights Reserved.</p>
        <p className="flex items-center gap-1.5 justify-center sm:justify-start">
          <span>Engineered with React + Tailwind v4 + Framer Motion</span>
        </p>
      </div>
    </section>
  );
};

export default Contact;
