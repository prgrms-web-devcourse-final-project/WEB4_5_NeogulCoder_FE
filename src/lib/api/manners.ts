import axiosInstance from '@/lib/api/axiosInstance';

export const fetchStudyList = async () => {
  const { data } = await axiosInstance.get('/reviews/studies/me');

  console.log(data.data.studies);
  return data.data.studies;
};

export const fetchUserListByStudyId = async (studyId: number) => {
  if (studyId < 0) return;
  const { data } = await axiosInstance.get(
    `/reviews/studies/${studyId}/targets`
  );
  console.log(data.data.userInfos);
  return data.data.userInfos;
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
