import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1234/api',
});

export default axiosInstance;
