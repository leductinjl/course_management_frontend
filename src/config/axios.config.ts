import axios from 'axios';
import { AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
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

// Enable debug mode if specified in env
if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Request:', config);
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response:', response);
      return response;
    },
    (error) => {
      console.error('Response Error:', error);
      return Promise.reject(error);
    }
  );
}

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    const instructorToken = localStorage.getItem('instructorToken');
    const adminToken = localStorage.getItem('adminToken');

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    let token = null;
    if (window.location.pathname.startsWith('/admin')) {
      token = adminToken;
    } else if (window.location.pathname.startsWith('/instructor')) {
      token = instructorToken;
    } else {
      token = userToken;
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      console.log('Request headers:', config.headers);
    }
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