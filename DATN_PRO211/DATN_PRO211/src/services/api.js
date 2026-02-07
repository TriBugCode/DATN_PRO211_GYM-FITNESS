import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5170/api', // Replace with your API base URL
});

// Add a request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;