import React, { useState } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import './Login.css'; 

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
    // const user = jwt_decode(token);
    // localStorage.setItem('user', JSON.stringify(user));
    // setUser(user);
    // return jwt_decode(token).sub;
  };

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/auth/jwt/login', {
      username: formData.email,
      password: formData.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status === 204) {
      const token = response.data.access_token;
        saveToken(token);
      setIsAuthenticated(true);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000000);
      console.log('Login successful!');
      console.log('Response data:', response.data);
      window.location.href = '/';
      return;
    }
  } catch (error) {
    console.error('Login failed:', error);
    
  }
};

  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h2 className="form-title">Авторизация</h2>
        {success && <p className="success-message">Успешная авторизация!</p>} 
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Введите ваш email" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="Введите ваш пароль" type="password" />
          </div>
          <button type="submit" className="form-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
