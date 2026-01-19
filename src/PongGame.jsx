import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PongGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game State Variables
    // Using refs for mutable state so they persist across renders without triggering re-renders
    // (This mimics the global variables you had in Processing)
    const state = {
      y1: 160,
      y2: 160,
      ballX: canvas.width / 2,
      ballY: canvas.height / 2,
      ballXv: 2,
      ballYv: 1,
      keys: {}
    };

    // --- Input Handling ---
    const handleKeyDown = (e) => {
      state.keys[e.key] = true;
    };
    const handleKeyUp = (e) => {
      state.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // --- Drawing & Logic Loop ---
    let animationFrameId;

    const render = () => {
      const { width, height } = canvas;

      // 1. Draw Background (Simulating the trail effect from your code)
      // Processing: fill(0, 0, 30, 30); rect(10, 10, width-20, height-20);
      ctx.fillStyle = 'rgba(0, 0, 30, 0.12)'; // approx 30/255 opacity
      ctx.fillRect(0, 0, width, height); // Clearing entire screen for simplicity or use specific rect

      // Draw border box if you strictly want your original design (rect(10,10...))
      // But usually clearing the whole screen is cleaner for standard JS games.
      // Let's stick to a full clear for a cleaner look, or semi-transparent for trails:
      // ctx.fillStyle = 'rgba(0, 0, 30, 0.2)'; 
      // ctx.fillRect(0, 0, width, height);

      // 2. Input Logic (Paddle Movement)
      // Left Paddle (W/S)
      if ((state.keys['w'] || state.keys['W']) && state.y1 > 0) {
        state.y1 -= 5; // Adjusted speed for 60fps
      }
      if ((state.keys['s'] || state.keys['S']) && state.y1 < height - 100) {
        state.y1 += 5;
      }
      // Right Paddle (I/K)
      if ((state.keys['i'] || state.keys['I']) && state.y2 > 0) {
        state.y2 -= 5;
      }
      if ((state.keys['k'] || state.keys['K']) && state.y2 < height - 100) {
        state.y2 += 5;
      }

      // 3. Draw Paddles
      // Processing: rect(40, y1, 10, 100);
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.fillRect(40, state.y1, 10, 100); // Left Paddle
      ctx.fillRect(width - 50, state.y2, 10, 100); // Right Paddle (360 in 400w is width-40)

      // 4. Ball Logic
      // Collision with paddles
      // Check X bounds first to avoid sticking
      if (
        (state.ballX > width - 60 && state.ballY > state.y2 && state.ballY < state.y2 + 100) ||
        (state.ballX < 60 && state.ballY > state.y1 && state.ballY < state.y1 + 100)
      ) {
        // Simple debounce to prevent ball getting stuck inside paddle
        if (state.ballX < 60 && state.ballXv < 0) state.ballXv *= -1;
        if (state.ballX > width - 60 && state.ballXv > 0) state.ballXv *= -1;
      }

      // Collision with Top/Bottom walls
      if (state.ballY > height || state.ballY < 0) {
        state.ballYv *= -1;
      }

      // Reset if out of bounds (Score)
      if (state.ballX > width || state.ballX < 0) {
        state.ballX = width / 2;
        state.ballY = height / 2;
        // Optional: Reset speed or direction here
      }

      // Update Position
      state.ballX += state.ballXv;
      state.ballY += state.ballYv;

      // 5. Draw Ball
      // Processing: ellipse(x, y, 10, 10);
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, 5, 0, Math.PI * 2); // Radius is 5 (diameter 10)
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    // Start Loop
    render();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#121212', 
      color: 'white' 
    }}>
      <h1>JS Pong</h1>
      <p style={{ marginBottom: '20px' }}>Controls: <b>W/S</b> (Left) | <b>I/K</b> (Right)</p>
      
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        style={{ 
          border: '2px solid #333', 
          borderRadius: '4px',
          background: 'black',
          boxShadow: '0 0 20px rgba(0,0,255,0.2)'
        }}
      />

      <Link to="/" style={{ 
        marginTop: '30px', 
        color: '#61dafb', 
        textDecoration: 'none',
        fontSize: '1.1rem',
        border: '1px solid #61dafb',
        padding: '10px 20px',
        borderRadius: '5px'
      }}>
        ← Back to Portfolio
      </Link>
    </div>
  );
}

export default PongGame;
