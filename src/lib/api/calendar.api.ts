import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 내 스터디 목록
export const getStudies = () => {
  return axiosInstance.get('/api/studies');
};

// 특정 스터디 조회
export const getStudy = (studyId: number) => {
  return axiosInstance.get(`/api/studies/${studyId}`);
};

// 스터디별 일정 전체 목록 조회
export const getStudyEvents = (studyId: number) => {
  return axiosInstance.get(`/api/teams/${studyId}/calendar`);
};

// 스터디 일정 날짜별 조회
export const getStudyDayEvents = (studyId: number, viewDate: string) => {
  return axiosInstance.get(
    `/api/teams/${studyId}/calendar/day?date=${viewDate}`
  );
};

// 스터디팀 일정 등록
export const postStudyEvent = (
  studyId: number,
  updateData: ScheduleInputType
) => {
  return axiosInstance.post(`/api/teams/${studyId}/calendar`, updateData);
};

// 스터디팀 일정 수정
export const putStudyEvent = (
  studyId: number,
  calendarId: number,
  updateData: ScheduleInputType
) => {
  return axiosInstance.put(
    `/api/teams/${studyId}/calendar/${calendarId}`,
    updateData
  );
};

// 스터디팀 일정 삭제
export const deleteStudyEvent = (studyId: number, calendarId: number) => {
  return axiosInstance.delete(`/api/teams/${studyId}/calendar/${calendarId}`);
};

///////////////////개인 일정//////////////////

// 개인 일정 전체 조회
export const getUserEvents = (userId: number) => {
  return axiosInstance.get(`/api/users/${userId}/calendar`);
};

// 개인 일정 날짜별 조회
export const getUserDayEvents = (userId: number, viewDate: string) => {
  return axiosInstance.get(
    `/api/users/${userId}/calendar/day?date=${viewDate}`
  );
};

// 스터디팀 일정 등록
export const postUserEvent = (
  userId: number,
  updateData: UserScheduleInputType
) => {
  return axiosInstance.post(`/api/users/${userId}/calendar`, updateData);
};

// 개인 일정 수정
export const putUserEvent = (
  userId: number,
  calendarId: number,
  updateData: UserScheduleInputType
) => {
  return axiosInstance.put(
    `/api/users/${userId}/calendar/${calendarId}`,
    updateData
  );
};

// 개인 일정 삭제
export const deleteUserEvent = (userId: number, calendarId: number) => {
  return axiosInstance.delete(`/api/users/${userId}/calendar/${calendarId}`);
};
