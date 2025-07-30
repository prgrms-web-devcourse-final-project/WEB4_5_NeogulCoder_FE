import axiosInstance from '@/lib/api/axiosInstance';

// 특정 스터디 조회
export const getHeaderStudies = async () => {
  const { data } = await axiosInstance.get(`/api/studies/me/images`);
  return data;
};
