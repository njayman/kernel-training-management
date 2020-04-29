import React from 'react';
import './App.css';

import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">Training Management</a>
        </div>
        <div class="navbar-end">
          <a className="navbar-item" href="https://training-management-backend.herokuapp.com/admin/">Admin</a>
        </div>
      </nav>
      <Projects />
    </div>
  );
}

export default App;
