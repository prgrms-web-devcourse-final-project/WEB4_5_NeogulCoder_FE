'use client';

import '@/styles/calendar/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import dayjs from 'dayjs';

export default function CalendarBig({
  events,
  openDetailHandler,
  colorStr,
}: {
  events: StudyScheduleType[];
  openDetailHandler: (date: string) => void;
  colorStr?: string;
}) {
  const calendarRef = useRef(null);

  // 캘린더 컬러값
  const colors = [
    '#CAF1FF',
    '#FFE0DD',
    '#FFF0B4',
    '#FFE5CC',
    '#C8FCFA',
    '#D5D4FC',
    '#F4C5F3',
    '#A7D7EB',
    '#C7F7CD',
    '#E1EAF3',
    '#CED7DE',
    '#B6FAFD',
    '#CDF3F4',
    '#F5D9FF',
    '#FFE6FB',
    '#EDF0FF',
    '#BAF1DA',
    '#BCFAE1',
    '#DCF0E4',
    '#CAF6E5',
    '#F0B9D6',
    '#FFC2D2',
    '#FFD2D5',
  ];

  // 사용자별 색상
  type UserColor = {
    id: number;
    color: string;
  };

  const userColors = events.reduce<UserColor[]>((acc, crr) => {
    const x = acc.find((item) => item.id === crr.writerId);
    if (!x) {
      acc.push({
        id: crr.writerId,
        color: colors[acc.length % colors.length],
      });
    }
    return acc;
  }, []);

  // 달력 라이브러리에 넘겨줄 값으로 변경
  const formating = (events ?? []).map((result) => {
    const color =
      colorStr != null
        ? colorStr
        : userColors.find(
            (item) => item.id === (result as StudyScheduleType).writerId
          )?.color;

    const startDate = dayjs(result.startTime).format('YYYY-MM-DD');
    const endDate = dayjs(result.endTime).format('YYYY-MM-DD');

    if (startDate === endDate) {
      return {
        title: result.title,
        start: startDate,
        end: endDate,
        color: color,
      };
    }
    return {
      title: result.title,
      start: startDate,
      end: dayjs(result.endTime).format('YYYY-MM-DD HH:mm'), //fullCalendar 특성상 뒤에 시간없으면 하루가 덜 나옴
      color: color,
    };
  });

  return (
    <>
      <div className='big-calendar border-border1 border rounded-[10px] py-6 px-7 relative'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'title',
            center: '',
            right: 'prev,today,next',
          }}
          buttonText={{
            today: '오늘',
          }}
          events={formating}
          dateClick={(e) => openDetailHandler(e.dateStr)}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }, // Separates year and month
            },
          }}
          expandRows={true}
          height='auto'
          contentHeight='auto'
          dayMaxEventRows={4}
          fixedWeekCount={false}
          dayCellClassNames={() => 'h-[120px]'}
        />
      </div>
    </>
  );
}
