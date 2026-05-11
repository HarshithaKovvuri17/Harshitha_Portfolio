import React from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Component imports
import NeuralBg from './components/NeuralBg';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Setup Lenis options for organic smooth deceleration
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="relative z-0 min-h-screen bg-[#0a0a0f] text-gray-300 antialiased font-sans selection:bg-accent-cyan/30 selection:text-white">
        
        {/* Interactive Neural Background Canvas */}
        <NeuralBg />

        {/* Sticky Glass Navbar */}
        <Navbar />
        
        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Journey />
          <Projects />
          <Contact />
        </main>

      </div>
    </ReactLenis>
  );
}

export default App;
