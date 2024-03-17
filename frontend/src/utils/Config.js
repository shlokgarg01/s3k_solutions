import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://s3k-solutions.onrender.com'
});

axiosInstance.interceptors.request.use(async function (config) {
  let token = localStorage.getItem('token');
  token = token ? JSON.parse(token) : '';

  config.headers.Authorization = `${token}`;
  return config;
});

// local - http://192.168.1.4:4000
// stag - https://s3k-solutions.onrender.com

export default axiosInstance;
