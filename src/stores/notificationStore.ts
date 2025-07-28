import { create } from 'zustand';

export type NotificationItem = {
  id: number;
  receiverUserID: number;
  alarmType: string;
  domainType: string;
  domainId: number;
  message: string;
  checked: boolean;
  createdDate: string;
};

type NotificationCount = {
  unReadCounts: number;
  setUnReadCounts: (count: number) => void;
};

export const countNotificationStore = create<NotificationCount>((set) => ({
  unReadCounts: 0,
  setUnReadCounts: (count) => set({ unReadCounts: count }),
}));
