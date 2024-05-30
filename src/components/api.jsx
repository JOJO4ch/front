// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // замените на URL вашего бэкенда
  withCredentials: true, // для отправки куки
});

export default api;