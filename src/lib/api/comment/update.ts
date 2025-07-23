import axios from 'axios';

export const updateComments = async (commentId: number) => {
  const response = await axios.put(`/recruitment-posts/comments/${commentId}`);
  return response.data.data;
};
