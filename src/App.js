import React from 'react';
import './App.css';
import Game from "./components/game";

function App() {

  return (
      <div className="app">
        <header className="header">
          <h1>Weather Game</h1>
        </header>
        <main className="main">
          <Game />
        </main>
        <footer className="footer">
          <p>© 2023 Weather Game App</p>
        </footer>
      </div>
  );
}

export default App;
