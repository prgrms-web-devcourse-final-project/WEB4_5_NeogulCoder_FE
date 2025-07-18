import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date,
  format: string = 'YYYY.MM.DD'
): string => {
  return dayjs(date).format(format);
};
