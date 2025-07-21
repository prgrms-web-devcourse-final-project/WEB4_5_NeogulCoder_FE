import { axiosInstance } from '../axios';

export const changeStatus = async (recruitmentPostId: number | undefined) => {
  try {
    const res = await axiosInstance.post(
      `/recruitment-posts/${recruitmentPostId}/status`
    );
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
