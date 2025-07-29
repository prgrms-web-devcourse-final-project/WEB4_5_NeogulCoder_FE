import axiosInstance from '@/lib/api/axiosInstance';

type CommentPayload = {
  postId: number;
  content: string;
};

type CommentTarget = 'recruitment' | 'study';

export const writeComment = async (
  target: CommentTarget,
  payload: CommentPayload
) => {
  try {
    let url = '';
    let data = {};
    if (target === 'recruitment') {
      url = `/recruitment-posts/${payload.postId}/comments`;
      data = {
        content: payload.content,
      };
    } else if (target === 'study') {
      url = `/api/studies/posts/${payload.postId}/comments`;
      data = {
        content: payload.content,
      };
    } else {
      throw new Error('잘못된 payload');
    }

    const res = await axiosInstance.post(url, data);

    return res.data;
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
};
