
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, 
});

export const fetchUsername = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await api.get('/protected-route', {
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
