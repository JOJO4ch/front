import React from 'react';
import { Link } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'; // импортируем библиотеку для декодирования JWT
import './Header.css';

const Header = ({ isAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Функция для декодирования токена и извлечения имени пользователя
  const getUsername = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        return decodedToken.username; // предположим, что имя пользователя хранится в поле 'username' токена
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title">Home</Link>
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
                <li><Link to="/AskGPT">Ask GPT</Link></li>
                <li><Link to="/article/create_edit_article">Create Article</Link></li>
                <li><span className="username">Welcome, {getUsername()}</span></li>
                <li><span className="logout" onClick={handleLogout}>Logout</span></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
