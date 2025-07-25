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
  currentNumber: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};
