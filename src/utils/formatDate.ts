import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (
  date: string | Date,
  format: string = 'YYYY.MM.DD'
): string => {
  return dayjs(date).format(format);
};
