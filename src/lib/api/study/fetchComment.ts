import { axiosInstance } from '../axios';

export const fetchComment = async (studyId: number, postId: number) => {
  const res = await axiosInstance.get(
    `/api/stuides/${studyId}/posts/${postId}/comments/all`
  );
  return res.data.data;
};
