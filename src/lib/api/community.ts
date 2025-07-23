import axiosInstance from '@/lib/api/axiosInstance';
import { RequestBodyType } from '@/types/community';

export const fetchStudyCommunityList = async (
  studyId: number,
  body: RequestBodyType
) => {
  const { data } = await axiosInstance.post(
    `/api/studies/${studyId}/posts/search`,
    body
  );
  return data.data;
};
