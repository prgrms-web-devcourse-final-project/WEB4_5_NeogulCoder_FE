import axiosInstance from '@/lib/api/axiosInstance';
import { MyListQueryType, StudyListQueryType } from '@/types/community';

export const fetchStudyCommunityList = async (
  studyId: number,
  params: StudyListQueryType
) => {
  const {
    page,
    pageSize = 10,
    category,
    keyword,
    attributeName = 'createDateTime',
    sort = 'DESC',
  } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(category ? { category } : {}),
    ...(keyword ? { keyword } : {}),
    attributeName,
    sort,
  });

  const { data } = await axiosInstance.get(
    `/api/studies/${studyId}/posts/search?${query.toString()}`
  );
  return data.data;
};

export const fetchMyCommunityList = async (
  studyId: number,
  params: MyListQueryType
) => {
  const {
    page,
    pageSize = 10,
    category,
    keyword,
    attributeName = 'createDateTime',
    sort = 'DESC',
  } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(category ? { category } : {}),
    ...(keyword ? { keyword } : {}),
    attributeName,
    sort,
  });

  const { data } = await axiosInstance.get(
    `/api/studies/${studyId}/posts/search/me?${query.toString()}`
  );
  return data.data;
};

export const deleteMeByStudy = async (studyId: number) => {
  const { data } = await axiosInstance.delete(`/api/studies/${studyId}/me`);
  return data.data;
};

export const participateInStudyExtension = async (studyId: number) => {
  const { data } = await axiosInstance.post(
    `/api/studies/${studyId}/extension/participations`
  );
  return data.data;
};

export const checkStudyExtension = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}/extension`);
  return data.data;
};

export const checkParticipationList = async (studyId: number) => {
  const { data } = await axiosInstance.get(
    `/api/studies/${studyId}/extension/participations`
  );
  return data.data;
};

export const checkMyRoleInStudy = async (studyId: number) => {
  const { data } = await axiosInstance.get(`/api/studies/${studyId}/me`);
  return data.data;
};
