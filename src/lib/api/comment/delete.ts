import axiosInstance from '@/lib/api/axiosInstance';

export const deleteComments = async (commentId: number, target: string) => {
  try {
    let url = '';

    if (target === 'recruitment') {
      url = `/recruitment-posts/comments/${commentId}`;
    } else if (target === 'study') {
      url = `/api/studies/posts/comments/${commentId}`;
    }
    const res = await axiosInstance.delete(url);
    console.log('댓글 삭제 성공!!');
    return res.data.data;
  } catch (error) {
    console.error('delete error:', error);
    throw error;
  }
};
