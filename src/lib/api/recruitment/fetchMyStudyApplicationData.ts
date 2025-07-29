import axiosInstance from '@/lib/api/axiosInstance';

export const fetchMyStudyApplicationData = async (page: number) => {
  const size = 20;
  const res = await axiosInstance.get(
    `/api/recruitment-posts/applications?page=${page}&size=${size}`
  );
  return res.data.data;
};
