import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <div className="app">
        <header className="header">
          <h1>Weather Game</h1>
        </header>
        <main className="main">
          <p>Window Width: {windowWidth}px</p>
        </main>
        <footer className="footer">
          <p>© 2023 Weather Game App</p>
        </footer>
      </div>
  );
}

export default App;
