import axiosInstance from '@/lib/api/axiosInstance';

export const updateComments = async (
  commentId: number,
  content: string,
  target: string
) => {
  try {
    let url = '';
    console.log(target);
    if (target === 'recruitment') {
      url = `/recruitment-posts/comments/${commentId}`;
    } else if (target === 'study') {
      url = `/api/studies/posts/comments/${commentId}`;
    } else {
      throw new Error('올바르지 않은 댓글 타겟입니다.');
    }

    const res = await axiosInstance.put(url, { content });

    console.log('댓글 수정 성공!!');
    return res.data.data;
  } catch (error) {
    console.error('put error:', error);
    throw error;
  }
};
