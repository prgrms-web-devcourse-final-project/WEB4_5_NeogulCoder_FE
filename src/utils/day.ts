import dayjs from 'dayjs';

export const dayFormatting = (date: string) => {
  let day = '';
  switch (dayjs(date).get('d')) {
    case 0:
      day = '일';
      break;
    case 1:
      day = '월';
      break;
    case 2:
      day = '화';
      break;
    case 3:
      day = '수';
      break;
    case 4:
      day = '목';
      break;
    case 5:
      day = '금';
      break;
    case 6:
      day = '토';
      break;
  }

  return day;
};
