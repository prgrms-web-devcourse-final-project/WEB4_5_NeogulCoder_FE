import { axiosInstance } from '../axios';

export const studyApplication = async (
  recruitmentPostId: number,
  applicationReason: string
) => {
  try {
    const res = await axiosInstance.post(
      `/api/recruitment-posts/${recruitmentPostId}/applications`,
      {
        applicationReason,
      }
    );
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
