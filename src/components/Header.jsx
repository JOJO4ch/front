import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; // Импортируем вашу api
import './Header.css';

const Header = () => {
  const [userData, setUserData] = useState(null); // Состояние данных пользователя

  // Функция для получения данных пользователя при загрузке компонента
  useEffect(() => {
    fetchUserData();
  }, []);

  // Функция для получения данных пользователя
  const fetchUserData = async () => {
    try {
      const response = await api.get('/protected-route');
      setUserData(response.data);
    } catch (error) {
      setUserData(null);
    }
  };

  // Функция для выхода из системы
  const handleLogout = async () => {
    try {
      await api.post('/auth/jwt/logout');
      setUserData(null);
      localStorage.removeItem('jwtToken');
      // Дополнительные действия после выхода, например, перенаправление на другую страницу
      // window.location.href = '/'; // Перенаправление на главную страницу
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">Smart Article</Link>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          {userData ? ( // Проверяем, есть ли данные пользователя
            <> {/* Если есть данные пользователя, отображаем кнопку выхода */}
              <li>{userData.username}</li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <> {/* Если данных пользователя нет, отображаем кнопки входа и регистрации */}
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
          <li><Link to="/GPT">AskGPT</Link></li>
          <li><Link to="/article/create_article">Create Article</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
