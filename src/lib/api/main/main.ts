import axiosInstance from '@/lib/api/axiosInstance';

// 스터디 모집글 조회
export const getRecruitments = async (
  page: number,
  category: string,
  studyType: string,
  keyword: string
) => {
  const { data } = await axiosInstance.get(`/recruitment-posts`, {
    params: {
      page,
      size: 10,
      ...(category && { category }),
      ...(studyType && { studyType }),
      ...(keyword && { keyword }),
    },
  });
  return data;
};
