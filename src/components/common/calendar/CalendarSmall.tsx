'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import '@/styles/calendar/calendar.css';
import dayjs from 'dayjs';

export default function CalendarSmall({
  handleClickDate,
  calendarData,
}: {
  handleClickDate: (date: string) => void;
  calendarData: StudyScheduleType[];
}) {
  const calendarRef = useRef(null);
  // 캘린더 컬러팔렛트
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
  // event에 들어갈 데이터
  const userColors = calendarData.reduce<UserColor[]>((acc, crr) => {
    const x = acc.find((item) => item.id === crr.writerId);
    if (!x) {
      acc.push({ id: crr.writerId, color: colors[acc.length % colors.length] });
    }
    return acc;
  }, []);

  // 달력 라이브러리에 넘겨줄 값으로 변경
  const formating = calendarData.map((result) => {
    const color = userColors.find((item) => item.id === result.writerId);
    const startDate = dayjs(result.startTime).format('YYYY-MM-DD');
    const endDate = dayjs(result.endTime).format('YYYY-MM-DD');

    if (startDate === endDate) {
      return {
        title: result.title,
        start: startDate,
        end: endDate,
        color: color?.color,
      };
    }
    return {
      title: result.title,
      start: startDate,
      end: dayjs(result.endTime).format('YYYY-MM-DD HH:mm'),
      color: color?.color,
    };
  });

  return (
    <>
      <div className='small-calendar px-9 '>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: '',
            center: 'title',
            right: '',
          }}
          buttonText={{
            today: '오늘',
          }}
          views={{
            dayGridMonth: {
              dayHeaderFormat: { day: 'numeric' }, // 숫자만 보이게
            },
            dayGridWeek: {
              dayHeaderFormat: { weekday: 'short', day: 'numeric' }, // 요일+숫자
            },
          }}
          events={formating}
          dateClick={(e) => handleClickDate(e.dateStr)}
          expandRows={true}
          dayMaxEventRows={0}
          fixedWeekCount={false}
          dayHeaderContent={(arg) => {
            const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
            return dayNames[arg.date.getDay()];
          }}
        />
      </div>
    </>
  );
}
