import axiosInstance from '@/lib/api/axiosInstance';

export const fetchAiQuiz = async (postId: number) => {
  const res = await axiosInstance.get(`/api/post/ai/${postId}`);
  return res.data.data;
};
