import dayjs from 'dayjs';

type WeekData = {
  weekdays: string[];
  dates: string[];
  startWeekday: boolean[];
};

export function getSortedDates(
  startDateStr: string,
  endDateStr: string
): WeekData {
  const start = dayjs(startDateStr);
  const end = dayjs(endDateStr);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdayToDate = new Map<number, string>();

  let cursor = start;
  while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
    const dayIndex = cursor.day();
    if (!weekdayToDate.has(dayIndex)) {
      weekdayToDate.set(dayIndex, cursor.format('MM.DD'));
    }
    cursor = cursor.add(1, 'day');
  }

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    if (!weekdayToDate.has(dayIndex)) {
      let backCursor = start.subtract(1, 'day');
      while (true) {
        if (backCursor.day() === dayIndex) {
          weekdayToDate.set(dayIndex, `n${backCursor.format('MM.DD')}`);
          break;
        }
        backCursor = backCursor.subtract(1, 'day');
      }
    }
  }

  const dates = weekdays.map((_, index) => weekdayToDate.get(index)!);

  const startWeekdayIndex = start.day();
  const startWeekday = Array(7).fill(false);
  startWeekday[startWeekdayIndex] = true;

  return {
    weekdays,
    dates,
    startWeekday,
  };
}
