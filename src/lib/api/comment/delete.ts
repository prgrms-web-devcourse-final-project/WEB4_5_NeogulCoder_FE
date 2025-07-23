import { axiosInstance } from '../axios';

export const deleteComments = async (commentId: number) => {
  try {
    const res = await axiosInstance.delete(
      `/recruitment-posts/comments/${commentId}`
    );
    return res.data.data;
    console.log('댓글 삭제 성공!!');
  } catch (error) {
    console.error('delete error:', error);
    throw error;
  }
};
