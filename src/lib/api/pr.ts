import { ReviewContentResponse } from '@/types/pr';
import axiosInstance from '@/lib/api/axiosInstance';

export const updatePrInfo = async (
  location: string,
  prUrls: { urlName: string; prUrl: string }[]
) => {
  return await axiosInstance.put('/api/template/update/template', {
    location,
    prUrls,
  });
};

export const getReviewContentsByUserId = async (
  userId: number,
  page: number,
  size: number = 5
) => {
  const res = await axiosInstance.get(`/reviews/users/${userId}/contents`, {
    params: { page, size },
  });
  return res.data.data as ReviewContentResponse;
};

export const getReviewTagsByUserId = async (userId: number) => {
  const res = await axiosInstance.get(`/reviews/users/${userId}/tags`);
  return res.data.data.reviewTypeMap;
};

export const getBuddyEnergy = async (userId: number) => {
  const res = await axiosInstance.get(`/api/buddy-energy/${userId}`);
  return res.data.data.level;
};
