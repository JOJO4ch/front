// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import '../styles.css'; // Import the CSS file

const Login = ({ setIsAuthenticated }) => {
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

  


  const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
    const user = jwt_decode(token);
    localStorage.setItem('user', JSON.stringify(user));
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

      const token = response.data.access_token;
      saveToken(token);
      setIsAuthenticated(true);
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
