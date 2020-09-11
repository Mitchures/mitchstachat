import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
  ? 'https://mitchstachat.herokuapp.com/' // production
  : 'http://localhost:9000', // development
});

export default instance;
