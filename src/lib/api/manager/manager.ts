import { axiosInstance } from '../axios';

// 사용자 목록 조회
export const getAdminUser = async (page: number, email: string) => {
  if (email !== '') {
    // 검색이 있을때
    const { data } = await axiosInstance.get(
      `/admin/users?page=${page}&email=${email}`
    );
    return data;
  } else {
    // 검색 없을때
    const { data } = await axiosInstance.get(`/admin/users?page=${page}`);
    return data;
  }
};

export const deleteAdminUser = async (userId: number) => {
  // 검색 없을때
  const { data } = await axiosInstance.delete(`/admin/users/${userId}`);
  return data;
};
