import React, { useState } from 'react';
import axios from '../axiosConfig';
import './Register.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    is_active: true,
    is_superuser: false,
    is_verified: false,
    login: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', formData);

      const { token } = response.data;
      localStorage.setItem('token', token);

      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your inputs and try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" type="password" />
        </div>
        <div className="form-group">
          <label htmlFor="login">Username</label>
          <input name="login" value={formData.login} onChange={handleChange} placeholder="Username" />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;