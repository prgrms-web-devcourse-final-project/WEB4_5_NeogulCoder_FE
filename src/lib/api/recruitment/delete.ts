import axiosInstance from '@/lib/api/axiosInstance';

export const deleteRecruitmentPost = async (
  recruitmentPostId: number | undefined
) => {
  try {
    const res = await axiosInstance.delete(
      `/recruitment-posts/${recruitmentPostId}`
    );
    return res.data;
  } catch (error) {
    console.error('delete error:', error);
    throw error;
  }
};
