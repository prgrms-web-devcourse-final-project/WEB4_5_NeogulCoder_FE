import axiosInstance from '@/lib/api/axiosInstance';

export const fetchStudyInfo = async (postId: number) => {
  const res = await axiosInstance.get(`/api/studies/posts/${postId}`);
  return res.data.data;
};
