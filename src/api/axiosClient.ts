import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosClient;
