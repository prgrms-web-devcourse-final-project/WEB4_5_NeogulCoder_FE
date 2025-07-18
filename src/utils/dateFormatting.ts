import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function dateFormat(create_at: string) {
  const now = dayjs();
  const createDate = dayjs(create_at);
  const diffMs = now.diff(createDate);

  const oneMinuteMs = 60 * 1000;
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (diffMs < oneMinuteMs) {
    return '방금 전';
  } else if (diffMs > oneDayMs) {
    return createDate.format('YYYY-MM-DD');
  } else {
    return createDate.fromNow().replace('약 ', '');
  }
}
