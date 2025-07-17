import { axiosInstance } from './axios';

// 내 스터디 목록
export const getStudies = async () => {
  const { data } = await axiosInstance.get('/api/studies');
  return data;
};

// 특정 스터디 조회
export const getStudy = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}`);
  return data;
};

// 스터디별 일정 전체 목록 조회
export const getStudyEvents = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/teams/${studyId}/calendar`);
  return data;
};

// 스터디 일정 날짜별 조회
export const getStudyDayEvents = async (studyId: number, viewDate: string) => {
  const { data } = await axiosInstance.get(
    `/api/teams/${studyId}/calendar/day?date=${viewDate}`
  );
  return data;
};

// 스터디팀 일정 등록
export const postStudyEvent = async (
  studyId: number,
  updateData: ScheduleInputType
) => {
  const { data } = await axiosInstance.post(
    `/api/teams/${studyId}/calendar`,
    updateData
  );
  return data;
};

// 스터디팀 일정 수정
export const putStudyEvent = async (
  studyId: number,
  calendarId: number,
  updateData: ScheduleInputType
) => {
  const { data } = await axiosInstance.put(
    `/api/teams/${studyId}/calendar/${calendarId}`,
    updateData
  );
  return data;
};

// 스터디팀 일정 삭제
export const deleteStudyEvent = async (studyId: number, calendarId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/teams/${studyId}/calendar/${calendarId}`
  );
  return data;
};

///////////////////개인 일정//////////////////

// 개인 일정 전체 조회
export const getUserEvents = async (userId: number) => {
  const { data } = await axiosInstance.get(`/api/users/${userId}/calendar`);
  return data;
};

// 개인 일정 날짜별 조회
export const getUserDayEvents = async (userId: number, viewDate: string) => {
  const { data } = await axiosInstance.get(
    `/api/users/${userId}/calendar/day?date=${viewDate}`
  );
  return data;
};

// 스터디팀 일정 등록
export const postUserEvent = async (
  userId: number,
  updateData: UserScheduleInputType
) => {
  const { data } = await axiosInstance.post(
    `/api/users/${userId}/calendar`,
    updateData
  );
  return data;
};

// 개인 일정 수정
export const putUserEvent = async (
  userId: number,
  calendarId: number,
  updateData: UserScheduleInputType
) => {
  const { data } = await axiosInstance.put(
    `/api/users/${userId}/calendar/${calendarId}`,
    updateData
  );
  return data;
};

// 개인 일정 삭제
export const deleteUserEvent = async (userId: number, calendarId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/users/${userId}/calendar/${calendarId}`
  );
  return data;
};
