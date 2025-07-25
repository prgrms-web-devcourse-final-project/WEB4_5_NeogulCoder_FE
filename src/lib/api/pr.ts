import { ReviewContentResponse } from '@/types/pr';
import { axiosInstance } from './axios';

export const updatePrInfo = async (
  location: string,
  prUrls: { urlName: string; prUrl: string }[]
) => {
  return await axiosInstance.put('/api/template/update/template', {
    location,
    prUrls,
  });
};

export const getReviewContents = async (page: number, size: number = 5) => {
  const res = await axiosInstance.get('/reviews/me/contents', {
    params: { page, size },
  });
  return res.data.data as ReviewContentResponse;
};

export const getReviewTags = async () => {
  const res = await axiosInstance.get('/reviews/me/tags');
  return res.data.data;
};

export const getBuddyEnergy = async (userId: number) => {
  const res = await axiosInstance.get(`/api/buddy-energy/${userId}`);
  return res.data.data.level;
};
