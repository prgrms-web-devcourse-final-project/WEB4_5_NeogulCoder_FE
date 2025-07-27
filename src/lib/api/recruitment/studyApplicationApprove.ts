import { axiosInstance } from '../axios';

export const studyApplicationApprove = async (applicationId: number) => {
  try {
    const res = await axiosInstance.post(
      `/api/recruitment-posts/applications/${applicationId}/approve`
    );
    console.log('승인 approve');
    return res.data;
  } catch (error) {
    console.error('승인 수락 error:', error);
    throw error;
  }
};
