import axios from 'axios';
import { getApiBaseUrl } from '../config/api';

const base = getApiBaseUrl();
const apiClient = axios.create({
  baseURL: base ? `${base.replace(/\/$/, '')}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
