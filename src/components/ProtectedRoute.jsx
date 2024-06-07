// src/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('jwtToken');
  const isAuthenticated = !!token;
  let username = '';

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      username = decodedToken.username; // предположим, что имя пользователя хранится в поле 'username' токена
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} username={username} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
