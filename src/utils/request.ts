import { HttpStatus } from '@/types/http-status.enum';
import axios from 'axios';
import { globalMessage } from '@/components/GlobalMessage';

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use(
  response => {
    console.log('respomse..');
    const { statusCode, data, message } = response.data;
    if (statusCode !== HttpStatus.OK && statusCode !== HttpStatus.CREATED) {
      globalMessage.error(message);
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  },
  // 用于处理 服务器 Error 例如 500
  error => {
    const {
      response: { data },
    } = error;
    globalMessage.error(data.message || '服务器错误');
    return Promise.reject(data);
  }
);

export default request;
