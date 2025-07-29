import axiosInstance from '@/lib/api/axiosInstance';

export const studyApplicationReject = async (applicationId: number) => {
  try {
    const res = await axiosInstance.post(
      `/api/recruitment-posts/applications/${applicationId}/reject`
    );
    console.log('승인 reject');
    return res.data;
  } catch (error) {
    console.error('승인 거절 error:', error);
    throw error;
  }
};
