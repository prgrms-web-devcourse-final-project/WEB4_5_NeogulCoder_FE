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

// 스터디 정보 수정
export const putStudyInfo = async (
  studyId: number,
  updateData: StudyInfoUpdateType | FormData
) => {
  const { data } = await axiosInstance.put(
    `/api/studies/${studyId}`,
    updateData
  );
  return data;
};

// 스터디장 위임
export const postDelegate = async (studyId: number, newLeaderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/studies/${studyId}/delegate`,
    { newLeaderId: newLeaderId }
  );
  return data;
};

// 초대를 위한 회원전체 조회
export const getAllUser = async () => {
  const { data } = await axiosInstance.get(`/api/users/all`);
  return data;
};

// 스터디 연장 여부
export const getStudyExtendInfo = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}/extension`);
  return data;
};

// 스터디 연장하기
export const postStudyExtend = async (studyId: number, newEndDate: string) => {
  const { data } = await axiosInstance.post(
    `/api/studies/${studyId}/extension`,
    { newEndDate: newEndDate }
  );
  return data;
};

// 스터디 삭제 (팀장만 스터디에 있는 경우)
export const deleteStudy = async (studyId: number) => {
  const { data } = await axiosInstance.delete(`/api/studies/${studyId}`);
  return data;
};

// 스터디 출석 조회
export const getStudyAttendance = async (studyId: number) => {
  const { data } = await axiosInstance.get(
    `/api/studies/${studyId}/attendances`
  );
  return data;
};
// 스터디 출석 체크
export const postStudyAttendance = async (studyId: number) => {
  const { data } = await axiosInstance.post(
    `/api/studies/${studyId}/attendances`
  );
  return data;
};

// 스터디 대시보드 정보 조회
export const getStudyDashboard = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}`);
  return data;
};

// 가입한 스터디 목록 (메인에 사용됨)
export const getStudiesMain = async () => {
  const { data } = await axiosInstance.get(`/api/studies/main`);
  return data;
};
