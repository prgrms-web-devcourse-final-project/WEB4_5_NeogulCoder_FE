import { axiosInstance } from './axios';

// 내 스터디 목록
export const getStudyInfoData = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}/info`);
  return data;
};

// 특정 스터디 조회
export const getStudyHeaderData = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}/header`);
  return data;
};
