import React from 'react';
import './App.css';
import { Game } from '../features/game/Game';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <h1>Reversi</h1>
    </header>
    <Game />
  </div>
);

export default App;
