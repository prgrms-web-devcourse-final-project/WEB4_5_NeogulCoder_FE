import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 내 스터디 목록
export const getStudyInfoData = (studyId: number) => {
  return axiosInstance.get(`/api/studies/${studyId}/info`);
};

// 특정 스터디 조회
export const getStudyHeaderData = (studyId: number) => {
  return axiosInstance.get(`/api/studies/${studyId}/header`);
};
