import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

function App() {
  const containerRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Create parallax transforms
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const projectsY = useTransform(scrollYProgress, [0.3, 1], [100, -100]);
  const projectsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  const projects = [
    {
      title: 'ESP32 Stock Market Ticker',
      description: 'WiFi-enabled stock ticker using an ESP32 and Arduino C to display real-time market data on an ST7789 TFT display.',
      githubLink: 'https://github.com/rjohnson8969/stockTicker',
      image: 'https://via.placeholder.com/400x250?text=ESP32+Stock+Ticker'
    },
    {
      title: 'Robotic Arm Automated Writing',
      description: 'Python program controlling a Fanuc CR-4iA robot arm for precise letter drawing using ROS.',
      githubLink: 'https://github.com/rjohnson8969/robotic-arm-writing',
      image: 'https://via.placeholder.com/400x250?text=Robotic+Arm'
    }
  ];

  return (
    <div className="App" ref={containerRef}>
      {/* Header with parallax */}
      <motion.header
        style={{
          y: headerY,
          opacity: headerOpacity
        }}
      >
        <motion.h1 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          Hi, I'm Riley Johnson!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
        >
          Welcome to my portfolio website, showcasing my passion for embedded systems, robotics, and web development.
        </motion.p>
      </motion.header>

      {/* Projects section with parallax */}
      <motion.section
        style={{
          y: projectsY,
          opacity: projectsOpacity
        }}
      >
        <motion.h2 
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div 
          className="projects-grid"
          initial="hidden" 
          animate="visible" 
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="project-item"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <footer>
        <p>
          Contact me: <a href="mailto:rileyjohnson313@gmail.com">rileyjohnson313@gmail.com</a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/riley-johnson-eng" target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
          <a href="https://github.com/rjohnson8969" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
