import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection observer behavior for active section highlighting
      const sections = navItems.map(item => document.getElementById(item.href.replace('#', '')));
      let currentSection = 'home';
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the top of the section is near the middle of the screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 glass-panel border-b border-white/5 cyan-glow/10' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Identity */}
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, '#home')} 
            className="flex items-center gap-2 group font-display font-bold text-xl tracking-tight focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
              <Cpu className="w-5 h-5 text-accent-cyan group-hover:text-accent-amber transition-colors duration-300" />
              <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span
              className="text-accent-cyan group-hover:text-accent-amber transition-colors duration-300 tracking-wide font-bold"
              style={{ textShadow: '0 0 18px rgba(0,240,255,0.55)' }}
            >
              K.Harshitha
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative font-sans text-sm tracking-wide font-medium transition-colors duration-300 hover:text-white focus:outline-none ${
                  activeSection === item.href.replace('#', '') ? 'text-accent-cyan font-semibold' : 'text-gray-400'
                }`}
              >
                {item.label}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-cyan shadow-[0_0_8px_#00f0ff]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            
            {/* Quick Status Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/5 border border-accent-cyan/20 text-[11px] font-mono text-accent-cyan tracking-wider uppercase animate-pulse-slow">
              <Activity className="w-3 h-3 text-accent-cyan animate-pulse" />
              <span>Enterprise Ready</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-accent-cyan"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-72 bg-[#0d0d14]/95 border-l border-white/5 p-8 flex flex-col justify-between md:hidden"
            >
              <div className="mt-16 flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.a
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`font-display text-lg font-semibold tracking-wide flex items-center justify-between border-b border-white/5 pb-2 hover:text-accent-cyan transition-colors duration-300 ${
                      activeSection === item.href.replace('#', '') ? 'text-accent-cyan' : 'text-gray-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.href.replace('#', '') && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#00f0ff]" />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Sidebar Footer info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-accent-cyan">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                  <span>Kovvuri Harshitha</span>
                </div>
                <p className="text-[10px] text-gray-500 font-mono text-center">
                  B.Tech CSE Student (2023-2027)
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
