import axiosInstance from '@/lib/api/axiosInstance';

export const sendEmailCode = async (email: string) => {
  const res = axiosInstance.post('/api/users/mail/send', { email });
  return res;
};

export const verifyEmailCode = async (email: string, code: string) => {
  const res = axiosInstance.post('/api/users/mail/verify', { email, code });
  return res;
};
