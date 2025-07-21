import { axiosInstance } from '../axios';

export const deleteRecruitmentPost = async (
  recruitmentPostId: number | undefined
) => {
  try {
    const res = await axiosInstance.delete(
      `/recruitment-posts/${recruitmentPostId}`
    );
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
