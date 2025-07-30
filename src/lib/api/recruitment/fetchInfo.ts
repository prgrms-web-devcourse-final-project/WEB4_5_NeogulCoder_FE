import axiosInstance from '@/lib/api/axiosInstance';

export const fetchInfo = async (recruitmentPostId: number) => {
  try {
    const res = await axiosInstance.get(
      `/recruitment-posts/${recruitmentPostId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('fetchInfo error:', error);
    throw error;
  }
};
