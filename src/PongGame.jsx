// src/PongGame.js
import React from 'react';
import { Link } from 'react-router-dom';

function PongGame() {
  return (
    <div style={{ textAlign: 'center', color: 'white', paddingTop: '50px' }}>
      <h1>Pong Game</h1>
      <p>Game canvas will go here...</p>
      {/* Back button to return to home */}
      <Link to="/" style={{ color: '#61dafb' }}>← Back to Portfolio</Link>
    </div>
  );
}

export default PongGame;
