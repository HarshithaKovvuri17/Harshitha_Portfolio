import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [resumeToast, setResumeToast] = useState(null); // null | 'downloading' | 'unavailable'

  const roles = ["Full-Stack Developer", "Data Specialist", "AI Integrator", "Problem Solver"];
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setTypedText(roles[0]);
      return;
    }

    let timer;
    const currentFullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        setTypingSpeed(90);

        if (typedText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        setTypingSpeed(45);

        if (typedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleResumeDownload = async (e) => {
    e.preventDefault();
    const pdfUrl = '/Resume_Kovvuri_Harshitha.pdf';

    try {
      const response = await fetch(pdfUrl, { method: 'HEAD' });
      if (response.ok) {
        // PDF found — trigger download
        setResumeToast('downloading');
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Resume_Kovvuri_Harshitha.pdf';
        link.click();
        setTimeout(() => setResumeToast(null), 3000);
      } else {
        throw new Error('Not found');
      }
    } catch {
      // PDF not available — open mailto as fallback
      setResumeToast('unavailable');
      setTimeout(() => {
        const subject = encodeURIComponent('Resume Request – Kovvuri Harshitha');
        const body = encodeURIComponent(
          'Hi Harshitha,\n\nI came across your portfolio and would love to receive your resume.\n\nBest regards,'
        );
        window.open(`mailto:harshitahanisha@gmail.com?subject=${subject}&body=${body}`, '_blank');
        setTimeout(() => setResumeToast(null), 4000);
      }, 1200);
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden neural-grid px-6 pt-28 lg:pt-32 pb-16"
    >
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-accent-cyan/10 blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-accent-amber/5 blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
      />

      {/* Main Contents */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Welcome Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 backdrop-blur-md mb-8"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan"></span>
          </span>
          <span>AVAILABLE FOR ENTERPRISE & DEVELOPMENT ROLES</span>
        </motion.div>

        {/* Huge Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-display"
        >
          Building Interfaces, <br />
          Powering <span className="text-gradient-cyan-amber select-all">Data Streams</span>
        </motion.h1>

        {/* Dynamic Typewriter Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 sm:h-12 flex items-center justify-center font-display text-xl sm:text-2xl text-gray-300 font-semibold mb-8"
        >
          <span>I am a&nbsp;</span>
          <span className="text-accent-cyan border-r-2 border-accent-cyan animate-pulse pr-1 py-1 font-mono tracking-tight text-gradient-cyan">
            {typedText}
          </span>
        </motion.div>

        {/* Brief Pitch */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base mb-10 leading-relaxed font-sans"
        >
          Hi, I am <strong className="text-white font-semibold">Kovvuri Harshitha</strong>. A B.Tech CSE scholar with a hybrid passion for bridging Full-Stack Web Development, Data Architecture (Snowflake, PowerBI), and Generative AI (Gemini APIs, Ollama).
        </motion.p>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          {/* Button 1: View My Work */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent-cyan to-blue-600 text-black font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>

          {/* Button 2: Download Resume */}
          <button
            onClick={handleResumeDownload}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-white/10 hover:border-accent-amber/50 bg-white/5 hover:bg-accent-amber/5 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_0_20px_rgba(255,184,0,0.15)] cursor-pointer"
          >
            <Download className="w-4.5 h-4.5 text-accent-amber group-hover:animate-bounce" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Resume Toast Notification */}
        <AnimatePresence>
          {resumeToast && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 inline-flex items-center gap-3 px-4 py-3 rounded-lg border text-xs font-mono mx-auto ${
                resumeToast === 'downloading'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              {resumeToast === 'downloading' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  <span>Downloading resume...</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Resume PDF not uploaded yet — opening email request...</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 p-1 flex justify-center">
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
