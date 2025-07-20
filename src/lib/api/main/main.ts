import { axiosInstance } from '../axios';

// 스터디 모집글 조회
export const getRecruitments = async () => {
  const { data } = await axiosInstance.get(`/recruitment-posts?page=0&size=5`);
  return data;
};
