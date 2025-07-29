import axiosInstance from '@/lib/api/axiosInstance';

export const writeRecruitmentPost = async (payload: {
  studyId: number | '';
  subject: string;
  content: string;
  recruitmentCount: number;
  expiredDate: string;
}) => {
  try {
    const res = await axiosInstance.post('/recruitment-posts', payload);
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
