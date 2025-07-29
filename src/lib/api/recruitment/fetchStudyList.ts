import axiosInstance from '@/lib/api/axiosInstance';

export const fetchStudyList = async () => {
  const res = await axiosInstance.get('/recruitment-posts/studies');
  return res.data.data;
};
