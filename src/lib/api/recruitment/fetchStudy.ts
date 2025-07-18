import { axiosInstance } from '../axios';

export const fetchStudy = async (studyId: number) => {
  const res = await axiosInstance.get(`/recruitment-posts/studies/${studyId}`);
  return res.data.data;
};
