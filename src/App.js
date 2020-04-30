import React from 'react';
import './App.css';

import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <div className="container">
        <nav className="navbar">
          <a className="navbar-item" href="/">Training Management</a>
          <a className="navbar-item" rel="noopener noreferrer" target="_blank" href="https://app.contentful.com/spaces/ssx7fwlkc9oh/">Admin</a>
        </nav>
      </div>
      <Projects />
    </div>
  );
}

export default App;
