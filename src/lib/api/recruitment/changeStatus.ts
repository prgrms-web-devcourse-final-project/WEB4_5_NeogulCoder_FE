import { axiosInstance } from '../axios';

export const changeStatus = async (
  recruitmentPostId: number | undefined,
  status: string
) => {
  try {
    const res = await axiosInstance.put(
      `/recruitment-posts/${recruitmentPostId}/status`,
      {
        status,
      }
    );
    console.log('상태 변경 성공!');
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
