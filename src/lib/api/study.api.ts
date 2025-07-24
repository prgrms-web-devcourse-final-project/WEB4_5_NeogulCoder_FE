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

export const putStudyInfo = (
  studyId: number,
  updateData: StudyInfoUpdateType
) => {
  return axiosInstance.put(`/api/studies/${studyId}`, updateData);
};

// 가입한 스터디 목록 (메인에 사용됨)
export const getStudiesMain = async () => {
  const { data } = await axiosInstance.get(`/api/studies/main`);
  return data;
};
