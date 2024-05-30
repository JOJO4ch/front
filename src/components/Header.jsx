// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-title">Smart Article</Link>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/AskGPT">AskGPT</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
