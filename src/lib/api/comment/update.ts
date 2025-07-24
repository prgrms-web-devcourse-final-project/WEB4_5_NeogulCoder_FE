import { axiosInstance } from '../axios';

export const updateComments = async (commentId: number, content: string) => {
  try {
    const res = await axiosInstance.put(
      `/recruitment-posts/comments/${commentId}`,
      {
        content,
      }
    );
    console.log('댓글 수정 성공!!');
    return res.data.data;
  } catch (error) {
    console.error('put error:', error);
    throw error;
  }
};
