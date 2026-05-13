import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, GraduationCap, Code2, Award, Briefcase, ChevronRight } from 'lucide-react';

const timelineEvents = [
  {
    title: "Current Projects & AI Integration",
    role: "AI & Full-Stack Architect",
    company: "Independent Developer",
    date: "2025 – Present",
    description:
      "Designed NeuralCert, an AI-powered certification verification engine using Google Gemini 1.5 Flash API for high-speed metadata validation. Deploying containerised web apps and writing microservices in Node.js and Python.",
    icon: Code2,
    nodeColor: "#00f0ff",
    borderColor: "border-[#00f0ff]/20",
    glow: "hover:shadow-[0_0_18px_rgba(0,240,255,0.12)]",
    roleColor: "text-[#00f0ff]",
  },
  {
    title: "Amaravathi Quantum Valley Hackathon",
    role: "Semifinalist (Winners)",
    company: "Quantum Valley",
    date: "Late 2024",
    description:
      "Pioneered a software solution leveraging quantum computational concepts. Secured a Semifinals Winner spot out of hundreds of engineering teams, showcasing innovative logic engineering and UI prototypes.",
    icon: Award,
    nodeColor: "#ffb800",
    borderColor: "border-[#ffb800]/20",
    glow: "hover:shadow-[0_0_18px_rgba(255,184,0,0.12)]",
    roleColor: "text-[#ffb800]",
  },
  {
    title: "Web Dev Django Intern",
    role: "Django Developer Intern",
    company: "Software Solutions Provider",
    date: "Mid 2024",
    description:
      "Developed and refined backend APIs using Django and SQLite/PostgreSQL. Created modular template-driven views, set up authentication rules, and designed custom admin dashboards for web analytics.",
    icon: Briefcase,
    nodeColor: "#34d399",
    borderColor: "border-emerald-400/20",
    glow: "hover:shadow-[0_0_18px_rgba(52,211,153,0.12)]",
    roleColor: "text-emerald-400",
  },
  {
    title: "FSD Data Specialist Intern",
    role: "Enterprise Data & Automation Intern",
    company: "Global Enterprise Services",
    date: "Early 2024",
    description:
      "Built three enterprise-grade pipelines using SharePoint & Power Automate. Designed data warehouse tables in Snowflake and integrated metrics into PowerBI executive dashboards.",
    icon: Briefcase,
    nodeColor: "#a855f7",
    borderColor: "border-purple-400/20",
    glow: "hover:shadow-[0_0_18px_rgba(168,85,247,0.12)]",
    roleColor: "text-purple-400",
  },
  {
    title: "B.Tech CSE (2023 – 2027)",
    role: "Undergraduate Student",
    company: "Aditya Engineering College and Technology",
    date: "2023 – Present",
    description:
      "Consistently maintaining an 8.31 CGPA. Mastering algorithms, data structures, DBMS, Operating Systems, and software design principles. Active member of technical coding circles.",
    icon: GraduationCap,
    nodeColor: "#60a5fa",
    borderColor: "border-blue-400/20",
    glow: "hover:shadow-[0_0_18px_rgba(96,165,250,0.12)]",
    roleColor: "text-blue-400",
  },
];

/* Each item is its own component so React hooks stay at component top-level */
const TimelineItem = ({ event }) => (
  <div className="relative flex flex-col items-start">
    {/* Animated node */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute w-8 h-8 rounded-full bg-[#0a0a0f] border-2 flex items-center justify-center z-10"
      style={{
        left: '-33px',
        borderColor: event.nodeColor,
        boxShadow: `0 0 12px ${event.nodeColor}`,
      }}
    >
      <event.icon className="w-4 h-4" style={{ color: event.nodeColor }} />
    </motion.div>

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className={`w-full glass-panel p-6 sm:p-8 rounded-2xl border ${event.borderColor}
        hover:bg-white/[0.02] backdrop-blur-md transition-all duration-300 group ${event.glow}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-lg sm:text-xl font-display font-semibold text-white tracking-wide
            group-hover:text-[#00f0ff] transition-colors duration-300">
            {event.title}
          </h4>
          <p className="text-xs sm:text-sm font-mono text-gray-400 flex items-center gap-1.5 mt-1 flex-wrap">
            <span>{event.role}</span>
            <ChevronRight className="w-3 h-3 text-[#ffb800]" />
            <span className={`font-semibold ${event.roleColor}`}>{event.company}</span>
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5
          border border-white/10 text-[10px] font-mono text-gray-300 sm:self-start w-fit shrink-0">
          <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>{event.date}</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{event.description}</p>
    </motion.div>
  </div>
);

/* Animated vertical line — driven by scroll via a wrapper ref */
const AnimatedLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  return (
    <div ref={ref} className="absolute left-3 sm:left-6 top-2 bottom-2 w-[2px] bg-white/5">
      <motion.div
        initial={{ height: 0 }}
        animate={inView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="w-full bg-gradient-to-b from-[#00f0ff] via-[#ffb800] to-blue-500 origin-top"
        style={{ boxShadow: '0 0 8px #00f0ff' }}
      />
    </div>
  );
};

const Journey = () => (
  <section id="journey" className="relative py-24 px-6 max-w-7xl mx-auto">
    {/* Background glow */}
    <div className="absolute top-1/3 left-10 w-[25rem] h-[25rem] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

    {/* Header */}
    <div className="text-center mb-20 relative z-10">
      <h2 className="text-sm font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
        03. JOURNEY
      </h2>
      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
        Chronicles of a <span className="text-gradient-cyan-amber">Developer</span>
      </h3>
      <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
        Tracing my path through academia, enterprise internships, hackathons, and current milestones.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative max-w-3xl mx-auto pl-10 sm:pl-14 z-10">
      <AnimatedLine />
      <div className="space-y-12">
        {timelineEvents.map((event) => (
          <TimelineItem key={event.title} event={event} />
        ))}
      </div>
    </div>
  </section>
);

export default Journey;
