import axiosInstance from '@/lib/api/axiosInstance';
import {
  MyApplicationQueryType,
  MyRecruitmentQueryType,
  MyStudyQueryType,
} from '@/types/my';

export const fetchMyRecruitmentList = async (
  params: MyRecruitmentQueryType
) => {
  const {
    page,
    size = 10,
    category,
    studyType,
    keyword,
    sort = 'DESC',
  } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(category ? { category } : {}),
    ...(studyType ? { studyType } : {}),
    ...(keyword ? { keyword } : {}),
    sort,
  });

  const { data } = await axiosInstance.get(
    `/recruitment-posts/me?${query.toString()}`
  );
  return data.data;
};

export const fetchMyStudyList = async (params: MyStudyQueryType) => {
  const { page, size = 12, finished, sort = 'DESC' } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(finished ? { finished } : {}),
    sort,
  });

  const { data } = await axiosInstance.get(`/api/studies?${query.toString()}`);
  return data.data;
};

export const fetchMyApplicationList = async (
  params: MyApplicationQueryType
) => {
  const { page, size = 12, status, sort = 'DESC' } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(status ? { status } : {}),
    sort,
  });

  const { data } = await axiosInstance.get(
    `/api/recruitment-posts/applications?${query.toString()}`
  );
  return data.data;
};
