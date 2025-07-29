import axiosInstance from '@/lib/api/axiosInstance';

export const deleteStudyPost = async (postId: number | undefined) => {
  try {
    const res = await axiosInstance.delete(`/api/studies/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error('delete error:', error);
    throw error;
  }
};
