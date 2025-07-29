import { UserInfo } from '@/stores/userStore';
import axiosInstance from '@/lib/api/axiosInstance';

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

// 조회
export const getUser = async () => {
  return await axiosInstance.get('/api/users/me');
};

// 특정 사용자 조회
export const getUserById = async (userid: number) => {
  return await axiosInstance.get<UserInfo>(`/api/users/${userid}`);
};
