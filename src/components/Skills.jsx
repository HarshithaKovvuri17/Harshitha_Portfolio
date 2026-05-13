import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Server, Cloud, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "#00f0ff",
    textColor: "text-[#00f0ff]",
    borderHover: "hover:border-[#00f0ff]/40",
    glowHover: "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL (HackerRank 5★)", level: 95 },
      { name: "Java", level: 85 },
      { name: "C & C++", level: 80 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    title: "Frontend & Mobile",
    icon: Layout,
    color: "#ffb800",
    textColor: "text-[#ffb800]",
    borderHover: "hover:border-[#ffb800]/40",
    glowHover: "hover:shadow-[0_0_30px_rgba(255,184,0,0.15)]",
    skills: [
      { name: "React.js / Vite", level: 90 },
      { name: "MERN Stack", level: 85 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    title: "Backend & DevOps",
    icon: Server,
    color: "#34d399",
    textColor: "text-emerald-400",
    borderHover: "hover:border-emerald-400/40",
    glowHover: "hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    skills: [
      { name: "Node.js & Express", level: 85 },
      { name: "Django (Python)", level: 85 },
      { name: "Spring Boot & Springsts", level: 75 },
      { name: "DevOps & Docker & Jenkins", level: 80 },
      { name: "Ollama (Local LLMs)", level: 85 },
      { name: "Postman (API Testing)", level: 90 },
    ],
  },
  {
    title: "Data Engineering & Cloud",
    icon: Cloud,
    color: "#a855f7",
    textColor: "text-purple-400",
    borderHover: "hover:border-purple-400/40",
    glowHover: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    skills: [
      { name: "Snowflake (SnowPro Associate)", level: 90 },
      { name: "SharePoint & Power Automate", level: 95 },
      { name: "PowerBI & Data Analytics", level: 85 },
      { name: "Git, Jupyter & VS Code", level: 90 },
      { name: "Postman (API Testing)", level: 90 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const Skills = () => (
  <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto">
    {/* Background glows */}
    <div className="absolute top-0 right-10 w-80 h-80 bg-[#ffb800]/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

    {/* Header */}
    <div className="text-center mb-16 relative z-10">
      <h2 className="text-sm font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
        02. SKILLS
      </h2>
      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
        My Technical <span className="text-gradient-cyan-amber">Armory</span>
      </h3>
      <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
        Full-stack capabilities combined with enterprise data processing pipelines,
        certified on multiple platforms.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {skillCategories.map((cat, catIdx) => (
        <motion.div
          key={cat.title}
          custom={catIdx}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={`glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.01]
            hover:bg-white/[0.02] backdrop-blur-md transition-all duration-500 group
            flex flex-col justify-between ${cat.borderHover} ${cat.glowHover}`}
        >
          {/* Category header */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10"
                  style={{ color: cat.color }}
                >
                  <cat.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-semibold text-white tracking-wide">
                  {cat.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors duration-300">
                SYSTEM READY
              </span>
            </div>

            {/* Skills */}
            <div className="space-y-5">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs sm:text-sm font-medium">
                    <span className="text-gray-300 group-hover:text-white transition-colors font-display">
                      {skill.name}
                    </span>
                    <span className="font-mono" style={{ color: cat.color }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Bar track */}
                  <div className="h-1.5 w-full rounded-full bg-white/5 border border-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.2, delay: 0.2 + catIdx * 0.05, ease: "easeInOut" }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: cat.color,
                        boxShadow: `0 0 8px ${cat.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-600">
            <span>STATUS: INITIALIZED</span>
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>60FPS READY</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
