import { axiosInstance } from './axios';

// 내 읽지 않은 알림 목록 조회
export const getUnreadNotifications = async () => {
  const res = await axiosInstance.get('/api/alarm/unchecked/my');
  return res.data.data;
};

// 읽음 여부 관련 없이 내 전체 알림 목록 조회
export const getNotifications = async () => {
  const res = await axiosInstance.get('/api/alarm/my');
  return res.data.data;
};

// 내 알림 전체 읽음 처리
export const readAllNotifications = async () => {
  const res = await axiosInstance.post('/api/alarm/my/check/all');
  return res.data;
};

// 알림 개별 읽음 처리
export const readNotifications = async (alarmId: number, accepted: boolean) => {
  const res = await axiosInstance.post(
    `/api/alarm/choose/${alarmId}/response`,
    null,
    { params: { accepted } }
  );
  return res.data;
};
