import axios from 'axios';
import { API_BASE_URL } from './api.config';
import { AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token from localStorage if it exists
const token = localStorage.getItem('adminToken');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    const instructorToken = localStorage.getItem('instructorToken');
    const adminToken = localStorage.getItem('adminToken');

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (instructorToken) {
      config.headers.Authorization = `Bearer ${instructorToken}`;
    } else if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('instructorToken');
      localStorage.removeItem('instructorData');
      
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/adminne/login';
      } else if (window.location.pathname.startsWith('/instructor')) {
        window.location.href = 'login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;