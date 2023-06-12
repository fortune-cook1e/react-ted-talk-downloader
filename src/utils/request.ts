import axios from 'axios';

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(response => {
  const { code, data } = response.data;
  if (code !== 0) {
    return Promise.reject();
  }
  return Promise.resolve(data);
});

export default request;
