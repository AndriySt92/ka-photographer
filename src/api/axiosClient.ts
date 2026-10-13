import axios from 'axios';

const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL
  : 'http://localhost:5000/api';

const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

if (import.meta.env.PROD) {
  axiosClient.defaults.headers.common['X-App-Version'] = '1.0.0';
}

export default axiosClient;
