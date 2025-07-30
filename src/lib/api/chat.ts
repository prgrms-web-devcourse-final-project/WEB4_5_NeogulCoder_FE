import { ApiResponse, ChatMessageType, PageResponse } from '@/types/chat';
import axiosInstance from '@/lib/api/axiosInstance';

export const fetchChatMessage = async (
  studyId: number,
  page: number,
  size = 20
) => {
  const res = await axiosInstance.get<
    ApiResponse<PageResponse<ChatMessageType>>
  >(`/api/chat/study/${studyId}/messages?page=${page}&size=${size}`);

  return res.data.data;
};
