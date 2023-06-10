import axios from 'axios';

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(response => {
  return Promise.resolve(response.data);
});

export default request;
