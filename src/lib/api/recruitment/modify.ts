import axiosInstance from '@/lib/api/axiosInstance';

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
    console.error('put error:', error);
    throw error;
  }
};
