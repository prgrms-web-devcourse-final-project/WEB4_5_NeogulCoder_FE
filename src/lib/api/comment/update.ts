import { axiosInstance } from '../axios';

export const updateComments = async (
  commentId: number,
  editedcontent: string
) => {
  try {
    const res = await axiosInstance.put(
      `/recruitment-posts/comments/${commentId}`,
      editedcontent
    );
    console.log('댓글 수정 성공!!');
    return res.data.data;
  } catch (error) {
    console.error('put error:', error);
    throw error;
  }
};
