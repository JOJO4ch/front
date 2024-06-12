import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file specific to Register

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    login: ''
  });

  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData); // Adjust the URL based on your API endpoint

      // Если код ответа 201 (Создан), отобразить сообщение об успешной регистрации
      if (response.status === 201) {
        setRegistrationSuccess(true);
        setError(null); // Очистка ошибки
      } else {
        setError('Registration failed. Please check your inputs and try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your inputs and try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        {registrationSuccess && <p className="success">Регистрация успешна!</p>}
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
