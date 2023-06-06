import axios, { AxiosRequestConfig } from 'axios';
import globalConfig from './config';

const instance = axios.create({
  baseURL: process.env.apiBaseUrl,
});

instance.interceptors.request.use(config => {
  config.headers['X-RapidAPI-Key'] = globalConfig.rapidApiKey;
  config.headers['X-RapidAPI-Host'] = globalConfig.rapidApiHost;
  return config;
});

instance.interceptors.response.use(response => {
  return response.data;
});

export default instance;
