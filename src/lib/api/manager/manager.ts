import axiosInstance from '@/lib/api/axiosInstance';

// 사용자 목록 조회
export const getAdminUser = async (page: number, email: string) => {
  const { data } = await axiosInstance.get(`/admin/users`, {
    params: {
      page,
      ...(email && { email }),
    },
  });
  return data;
};
//  시용자 비활성화
export const deleteAdminUser = async (userId: number) => {
  const { data } = await axiosInstance.delete(`/admin/users/${userId}`);
  return data;
};

//  시용자 활성화
export const postAdminUser = async (userId: number) => {
  const { data } = await axiosInstance.post(`/admin/reactive/user/${userId}`);
  return data;
};

///////////////////////////////////////////////////////////////////////////////
// 스터디 조회
export const getAdminStudies = async (
  page: number,
  name?: string,
  category?: string
) => {
  const { data } = await axiosInstance.get(`/admin/studies`, {
    params: {
      page,
      ...(name && { name }),
      ...(category && { category }),
    },
  });
  return data;
};
// 스터디 비활성화
export const deleteAdminStudy = async (studyId: number) => {
  const { data } = await axiosInstance.delete(`/admin/studies/${studyId}`);
  return data;
};

//스터디 활성화
export const postAdminStudy = async (studyId: number) => {
  const { data } = await axiosInstance.post(`/admin/reactive/study/${studyId}`);
  return data;
};

//////////////////////////////////////////////////////////////////////
// 모집글 목록 조회
export const getAdminPosts = async (page: number, subject: string) => {
  const { data } = await axiosInstance.get(`/admin/recruitment-posts`, {
    params: {
      page,
      ...(subject && { subject }),
    },
  });
  return data;
};
//모집글 비활성화
export const deleteAdminPost = async (postId: number) => {
  const { data } = await axiosInstance.delete(
    `/admin/recruitment-posts/${postId}`
  );
  return data;
};
//모집글 활성화
export const postAdminPost = async (postId: number) => {
  const { data } = await axiosInstance.post(`/admin/reactive/study/${postId}`);
  return data;
};
