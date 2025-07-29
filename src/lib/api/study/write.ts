import axiosInstance from '@/lib/api/axiosInstance';

export const writeStudyPost = async (
  studyId: number,
  payload: {
    title: string;
    category: string;
    content: string;
  }
) => {
  try {
    const res = await axiosInstance.post(
      `/api/studies/${studyId}/posts`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('post error:', error);
    throw error;
  }
};
