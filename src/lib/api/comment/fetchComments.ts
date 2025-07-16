import axios from 'axios';

export const fetchComments = async (studyId: number, postId: number) => {
  const response = await axios.get(
    `/api/studies/${studyId}/posts/${postId}/comments`
  );
  return response.data.data;
};
