// src/Logout.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    history.push('/login'); // Redirect to the login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
