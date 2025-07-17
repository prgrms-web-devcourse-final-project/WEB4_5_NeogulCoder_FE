import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const signup = (
  email: string,
  nickname: string,
  password: string,
  passwordCheck: string
) => {
  return axiosInstance.post('/api/users/signup', {
    email,
    nickname,
    password,
    passwordCheck,
  });
};

export const login = (email: string, password: string) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const getUser = async () => {
  return await axiosInstance.get('/api/users/me');
};
