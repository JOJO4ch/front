// src/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsername } from './api';
import './Header.css';

const Header = ({ isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      const username = await fetchUsername();
      if (username) {
        setUsername(username);
      }
    };

    if (isAuthenticated) {
      getUsername();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="header-title">Smart Article</Link>
          {isAuthenticated && <span className="username">Welcome, {username}</span>}
        </div>
        <div className="center-section">
          <nav className="navbar">
            <ul className={menuOpen ? 'show' : ''}>
              {!isAuthenticated && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li><Link to="/article/create_edit_article">Создать пост</Link></li>
                  <li><Link to="/article/search">Поиск</Link></li>
                  <li><Link to="/create_gpt_construct">Создать Конструкт</Link></li>
                  <li><Link to="/adminPanel">Admin</Link></li>
                  <li><Link to="/search_constructs">Конструкты</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
        {isAuthenticated && (
          <div className="right-section">
            <span className="logout" onClick={handleLogout}>Выход</span>
            <div className="hamburger" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
