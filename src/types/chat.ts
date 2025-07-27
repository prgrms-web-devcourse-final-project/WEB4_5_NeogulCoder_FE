export type ChatMessageType = {
  id: number;
  studyId: number;
  senderId: number;
  senderNickname: string;
  profileImageUrl: string | null;
  message: string;
  sentAt: string;
};

export type ChatGroup = {
  date: string;
  messages: ChatMessageType[];
};

export type PageResponse<T> = {
  content: T[];
  currentPage: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};
