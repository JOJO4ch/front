// src/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsername } from './api'; // Импортируем нашу функцию
import './Header.css';

const Header = ({ isAuthenticated }) => {
  const [username, setUsername] = useState('');

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

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title">Smart Article</Link>
        <nav className="navbar">
          <ul>
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
                <li><span className="username">Welcome, {username}</span></li>
                <li><span className="logout" onClick={handleLogout}>Выход</span></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
