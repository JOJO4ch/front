// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // замените на URL вашего бэкенда
  withCredentials: true, // для отправки куки
});

export const fetchUsername = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await axios.get('api/protected-route', {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    // Извлекаем имя пользователя из ответа
    const username = response.data.replace('Hello, ', '');
    return username;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
};

export default api;