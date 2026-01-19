import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PongGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game State Variables
    const state = {
      y1: 160,
      y2: 160,
      ballX: canvas.width / 2,
      ballY: canvas.height / 2,
      ballXv: 2,
      ballYv: 1,
      scoreLeft: 0,
      scoreRight: 0,
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

      // Draw background
      ctx.fillStyle = 'rgba(0, 0, 30, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Draw Score
      ctx.font = '32px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText(`${state.scoreLeft}   ${state.scoreRight}`, width / 2, 50);

      // Draw Center Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

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

      // Draw Paddles
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.fillRect(40, state.y1, 10, 100); // Left Paddle
      ctx.fillRect(width - 50, state.y2, 10, 100); // Right Paddle (360 in 400w is width-40)

      // Collision with paddles
      if (
        (state.ballX > width - 60 && state.ballY > state.y2 && state.ballY < state.y2 + 100) ||
        (state.ballX < 60 && state.ballY > state.y1 && state.ballY < state.y1 + 100)
      ) {
        if (state.ballX < 60 && state.ballXv < 0) state.ballXv *= -1.1;
        if (state.ballX > width - 60 && state.ballXv > 0) state.ballXv *= -1.1;
      }

      // Collision with Top/Bottom walls
      if (state.ballY > height || state.ballY < 0) {
        state.ballYv *= -1;
      }

      // Scoring logic
      if (state.ballX > width) {
        state.scoreLeft += 1;
        resetBall(-1);
      } else if (state.ballX < 0) {
        state.scoreRight += 1;
        resetBall(1);
      }

      // Update Position
      state.ballX += state.ballXv;
      state.ballY += state.ballYv;

      // Draw Ball
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, 5, 0, Math.PI * 2); // Radius is 5 (diameter 10)
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };


    const resetBall = (direction) => {
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
      state.ballXv = 2 * direction;
      state.ballYv = 1;
    }


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
