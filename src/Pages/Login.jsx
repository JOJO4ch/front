import React, { useState } from 'react';
import api from '../components/api'; // Импортируем вашу api
import '../styles.css'; // Импортируем CSS файл

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveToken = (token) => { // Объявляем функцию для сохранения токена
    localStorage.setItem('jwtToken', token);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/jwt/login', {
        grant_type: '',
        username: formData.email,
        password: formData.password,
        scope: '',
        client_id: '',
        client_secret: ''
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Получаем токен из ответа
      const token = response.data.access_token;

      // Сохраняем токен
      saveToken(token);

      // Дополнительные действия после успешной авторизации
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
