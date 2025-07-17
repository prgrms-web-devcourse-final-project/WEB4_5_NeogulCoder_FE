import axiosInstance from '@/lib/api/axiosInstance';

export const fetchStudyList = async () => {
  const { data } = await axiosInstance.get('/reviews/studies');
  return data;
};

export const fetchUserListByStudyId = async (studyId: number) => {
  const { data } = await axiosInstance.get(
    `/reviews/studies/${studyId}/targets`
  );
  return data;
};

export const postReviews = async (
  studyId: number,
  targetUserId: number,
  reviewType: string,
  reviewTag: string[],
  content: string
) => {
  const { data } = await axiosInstance.post('/reviews', {
    studyId,
    targetUserId,
    reviewType,
    reviewTag,
    content,
  });
  return data;
};
