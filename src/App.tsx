import React from 'react';
import './App.scss';
import Game from "./components/game";
import TextConstants from "./constants/TextConstants";
function App() {

  return (
      <div className="app">
        <header className="header">
          <h1>{TextConstants.HEADER.HEADER_TITLE}</h1>
        </header>
        <main className="main">
          <Game />
        </main>
        <footer className="footer">
          <p>{TextConstants.FOOTER.WEATHER_GAME_APP}</p>
        </footer>
      </div>
  );
}

export default App;
