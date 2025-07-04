import { DB_URL } from '@/const';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: DB_URL,
  withCredentials: true
});