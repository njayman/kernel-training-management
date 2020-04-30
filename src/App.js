import React from 'react';
import './App.css';

import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">Training Management</a>
          </div>
          <a className="navbar-item" target="_blank" href="https://training-management-backend.herokuapp.com/admin/">Admin</a>
        </nav>
      </div>
      <Projects />
    </div>
  );
}

export default App;
