import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    window.location.reload();
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
