import { axiosInstance } from '../axios';

export const fetchStudyApplication = async (
  recruitmentPostId: number,
  page: number
) => {
  const size = 5;
  const res = await axiosInstance.get(
    `/api/recruitment-posts/${recruitmentPostId}/applications?page=${page}&size=${size}`
  );
  return res.data.data;
};
