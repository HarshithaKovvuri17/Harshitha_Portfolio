import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Cpu } from 'lucide-react';

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate 3D tilt coordinates
  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotateX(y * -10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="relative glass-panel rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01] hover:border-white/15 transition-all duration-300 ease-out group flex flex-col h-full"
    >
      {/* Cinematic Preview Parallax Image wrapper */}
      <div
        className="relative overflow-hidden h-48 sm:h-56 shrink-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-105 transition-transform duration-500 ease-out"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: `translate3d(${rotateY * 0.8}px, ${rotateX * -0.8}px, 0) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
        
        {/* Floating tech badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-mono text-accent-cyan uppercase tracking-widest z-10 backdrop-blur-md">
          <Cpu className="w-3 h-3 text-accent-cyan" />
          <span>{project.category}</span>
        </div>
      </div>

      {/* Content Area */}
      <div
        className="p-6 sm:p-8 flex flex-col justify-between flex-grow"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex-grow">
          <span className="text-[10px] font-mono text-accent-amber tracking-widest uppercase mb-1.5 block">
            {project.subtitle}
          </span>
          <h4 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-wide mb-3 group-hover:text-accent-cyan transition-colors duration-300">
            {project.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans mb-6">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] sm:text-xs font-mono text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <a 
              href={project.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
            
            <a 
              href={project.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-accent-cyan hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Project Details</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projectsData = [
    {
      title: "AI-NeuralCert",
      subtitle: "AI-Powered Certification Validator",
      category: "AI & Full-Stack",
      description: "An AI-powered web application that allows students to take dynamically generated online tests and receive automated certificates upon completion.",
      stack: ["React", "Node.js", "Express.js", "Mongodb", "Gemini 1.5 Flash", "Pdf kit", "Node mailer", "JWT", "bcrypt", "AWS EC2"],
      image: "/project_neuralcert.png",
      github: "https://github.com/HarshithaKovvuri17/AI-NeuralCert"
    },
    {
      title: "ArticulateHub",
      subtitle: "AI Communication Coach",
      category: "AI & EdTech",
      description: "An AI-powered communication coaching platform that helps students practice presentations, debates, group discussions, JAM sessions, and interviews with real-time AI interaction, speech analysis, body language tracking, and personalized performance feedback.",
      stack: ["React.js", "Power Apps", "Power Automate", "Power BI", "Firebase", "OpenAI", "Azure OpenAI", "Vertex AI", "Gemini", "Copilot Studio"],
      image: "/project_articulate.png",
      github: "https://github.com/HarshithaKovvuri17/ArticulateHub"
    },
    {
      title: "Newsletter Distribution System",
      subtitle: "Enterprise Workflow Automation",
      category: "Automation / Enterprise",
      description: "Automated newsletter creation, approvals, and email distribution with centralized tracking and archives.",
      stack: ["Excel", "SharePoint", "Power Automate"],
      image: "/project_newsletter.png",
      github: "https://github.com/HarshithaKovvuri17/Newsletter-Distribution-System"
    },
    {
      title: "Student 360 Platform",
      subtitle: "Unified Academic Portal",
      category: "Enterprise Solution",
      description: "Built a unified system for admissions, attendance, academics, hostel, and feedback with automated workflows.",
      stack: ["SharePoint", "Excel", "Power Automate"],
      image: "/project_student360.png",
      github: "https://github.com/HarshithaKovvuri17/Student-360-Platform"
    },
    {
      title: "MovieMate",
      subtitle: "Online Movie Ticket Booking System",
      category: "Full-Stack Backend",
      description: "Developed a secure web app for real-time movie browsing, seat booking, and ticket management.",
      stack: ["Django", "HTML", "CSS", "JavaScript", "SQLite"],
      image: "/project_moviemate.png",
      github: "https://github.com/HarshithaKovvuri17/MovieMate"
    }
  ];

  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background visual glows */}
      <div className="absolute top-1/4 left-1/3 w-[30rem] h-[30rem] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm font-mono text-accent-cyan uppercase tracking-widest mb-3">04. PORTFOLIO</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Featured <span className="text-gradient-cyan-amber">Projects</span>
        </h3>
        <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
          A showcase of full-stack software development, automated cloud architectures, and machine-learning integrations.
        </p>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {projectsData.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
