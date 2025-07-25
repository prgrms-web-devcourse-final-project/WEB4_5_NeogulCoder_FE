import { ApiResponse, ChatMessageType, PageResponse } from '@/types/chat';
import { axiosInstance } from './axios';

export const fetchChatMessage = async (
  roomId: number,
  page: number,
  size = 20
) => {
  const res = await axiosInstance.get<
    ApiResponse<PageResponse<ChatMessageType>>
  >(`/api/chat/room/${roomId}/messages?page=${page}&size=${size}`);

  return res.data.data;
};
