import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getStudyDashBoardData = (studyId: number) => {
  return axiosInstance.get(`/api/studies/${studyId}`);
};

export const getStudyHeaderData = (studyId: number) => {
  return axiosInstance.get(`/api/studies/${studyId}/header`);
};
