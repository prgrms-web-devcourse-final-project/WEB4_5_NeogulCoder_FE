export type ChatMessageType = {
  id: number;
  senderId: number;
  senderNickname: string;
  profileImageUrl: string | null;
  roomId: number;
  message: string;
  sentAt: string;
};

export type ChatGroup = {
  date: string;
  messages: ChatMessageType[];
};
