import { axiosInstance } from '../axios';

export const modifyStudyPost = async (
  postId: number,
  payload: {
    title: string;
    category: string;
    content: string;
  }
) => {
  try {
    const res = await axiosInstance.put(
      `/api/studies/posts/${postId}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('put error:', error);
    throw error;
  }
};
