import { axiosInstance } from '../axios';

export const fetchInfo = async (recruitmentPostId: number) => {
  const res = await axiosInstance.get(
    `/recruitment-posts/${recruitmentPostId}`
  );
  return res.data.data;
};
