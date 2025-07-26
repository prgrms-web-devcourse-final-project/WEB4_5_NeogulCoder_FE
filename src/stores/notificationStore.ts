export type NotificationItem = {
  id: number;
  receiverUserID: number;
  alarmType: string;
  domainType: string;
  domainId: number;
  message: string;
  checked: boolean;
};
