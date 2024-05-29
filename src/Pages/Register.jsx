import React, { useState } from 'react';
import './Register.css'; // Import the CSS file

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    is_active: true,
    is_superuser: false,
    is_verified: false,
    username: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement your registration logic here
      console.log('Registration form data:', formData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
        </div>
        <div className="form-group">
          <label htmlFor="Username">Username</label>
          <input name="Username" value={formData.username} onChange={handleChange} placeholder="Username" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
