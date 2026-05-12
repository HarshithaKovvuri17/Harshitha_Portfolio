import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Award, Briefcase, Star, Database } from 'lucide-react';

// Handle CJS/ESM double default wrapping interop for react-countup
const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);

const About = () => {
  const stats = [
    {
      value: 5,
      suffix: "★",
      label: "HackerRank 5-Star SQL Coder",
      icon: Star,
      color: "text-accent-amber",
      borderGlow: "rgba(255, 184, 0, 0.15)",
    },
    {
      value: 10,
      suffix: "+",
      label: "Certifications Completed",
      icon: Award,
      color: "text-accent-cyan",
      borderGlow: "rgba(0, 240, 255, 0.15)",
    },
    {
      value: 3,
      suffix: "+",
      label: "Enterprise Projects Delivered",
      icon: Briefcase,
      color: "text-emerald-400",
      borderGlow: "rgba(52, 211, 153, 0.15)",
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* ── LEFT: Story + Stats ── */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
              01. ABOUT ME
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight font-display">
              Bridging the gap between{" "}
              <span className="text-gradient-cyan-amber">raw data</span> and{" "}
              <span className="text-gradient-cyan">human experience</span>
            </h3>

            <div className="space-y-5 text-gray-400 text-sm sm:text-base leading-relaxed">
              <p>
                I am a B.Tech Computer Science and Engineering student (2023-2027) tracking a high-performance{" "}
                <strong className="text-white">8.31 CGPA</strong>. I occupy a rare sweet spot: combining agile{" "}
                <strong className="text-white">Full-Stack Web Development</strong> with the analytical powerhouse of a{" "}
                <strong className="text-white">Data Specialist</strong>.
              </p>
              <p>
                Whether engineering microservices with <strong className="text-white">Node.js</strong> and{" "}
                <strong className="text-white">Django</strong>, setting up enterprise pipeline automation in{" "}
                <strong className="text-white">SharePoint & Power Automate</strong>, or building secure data
                warehousing clusters in <strong className="text-white">Snowflake</strong>, I deliver clean code
                that drives value.
              </p>
              <p>
                Certified as a <strong className="text-white">SnowPro Core Associate</strong>, Google Cloud
                practitioner, and Semifinalist at the prestigious{" "}
                <strong className="text-white">Amaravathi Quantum Valley Hackathon</strong>.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 0 20px ${stat.borderGlow}` }}
                />
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00f0ff] transition-colors" />
                </div>
                <h4 className={`text-2xl sm:text-3xl font-display font-bold text-white mb-1 ${stat.color}`}>
                  <CountUpComponent
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                    scrollSpyDelay={200}
                  />
                </h4>
                <p className="text-xs text-gray-500 font-mono tracking-tight leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Avatar card ── */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 group cursor-pointer">
            {/* Hover ambient glow */}
            <div className="absolute inset-2 bg-[#00f0ff]/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            {/* Animated SVG border */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="1" y="1" width="98" height="98" rx="6"
                fill="none"
                stroke="rgba(0,240,255,0.4)"
                strokeWidth="0.8"
                strokeDasharray="20 180"
                animate={{ strokeDashoffset: [0, -200] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.rect
                x="1" y="1" width="98" height="98" rx="6"
                fill="none"
                stroke="rgba(255,184,0,0.4)"
                strokeWidth="0.8"
                strokeDasharray="40 160"
                animate={{ strokeDashoffset: [100, -100] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="1" cy="20" r="1.5" fill="#00f0ff" />
              <line x1="1" y1="20" x2="8" y2="20" stroke="#00f0ff" strokeWidth="0.5" />
              <circle cx="99" cy="80" r="1.5" fill="#ffb800" />
              <line x1="99" y1="80" x2="92" y2="80" stroke="#ffb800" strokeWidth="0.5" />
            </svg>

            {/* Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#00f0ff]/40 bg-black/40 transition-colors duration-500">
              <img
                src="/avatar.png"
                alt="Kovvuri Harshitha Portrait"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 neural-grid opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#0d0d14]/90 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-md shadow-lg group-hover:border-[#ffb800]/40 transition-all duration-300">
              <Database className="w-4 h-4 text-[#ffb800]" />
              <span className="text-[10px] font-mono font-semibold text-white tracking-widest">
                DATA SPECIALIST
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
