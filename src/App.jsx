import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import './App.css';

// 3D rotating cube component
function RotatingCube() {
  return (
    <mesh rotation={[10, 15, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3498db" wireframe />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          Hi, I'm Riley Johnson!
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Welcome to my 3D portfolio website, showcasing my passion for embedded systems, robotics, and web development.
        </motion.p>
      </header>

      <section className="canvas-container">
        <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
          <OrbitControls enableZoom={true} />
          <Html position={[0, -2, 0]}>
            <div className="caption">Explore my 3D Cube!</div>
          </Html>
        </Canvas>
      </section>

      <section>
        <motion.h2 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
          Featured Projects
        </motion.h2>
        <motion.ul initial="hidden" animate="visible" variants={{
          visible: { transition: { staggerChildren: 0.3 } }
        }}>
          {[
            {
              title: 'ESP32 Stock Market Ticker',
              description: 'WiFi-enabled stock ticker using ESP32 and Arduino C to display real-time market data on an ST7789 TFT display.'
            },
            {
              title: 'Robotic Arm Automated Writing',
              description: 'Python program controlling a Fanuc CR-4iA robot arm for precise letter drawing using ROS.'
            }
          ].map(({ title, description }, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="project-item"
            >
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

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
