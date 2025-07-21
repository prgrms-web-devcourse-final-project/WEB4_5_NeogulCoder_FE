import { axiosInstance } from '../axios';

export const modifyRecruitmentPost = async (
  recruitmentPostId: number,
  payload: {
    subject: string;
    content: string;
    recruitmentCount: number;
    expiredDate: string;
  }
) => {
  try {
    const res = await axiosInstance.put(
      `/recruitment-posts/${recruitmentPostId}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
