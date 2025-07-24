import { axiosInstance } from './axios';

export const sendEmailCode = async (email: string) => {
  const res = axiosInstance.post(`/api/users/mail/send?email=${email}`);
  return res;
};

export const verifyEmailCode = async (email: string, code: string) => {
  const res = axiosInstance.post(
    `/api/users/mail/verify?email=${email}&code=${code}`
  );
  return res;
};
