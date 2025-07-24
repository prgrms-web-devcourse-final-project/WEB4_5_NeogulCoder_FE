'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import '@/styles/calendar/calendar.css';
import dayjs from 'dayjs';

export default function CalendarSmall({
  handleClickDate,
}: {
  handleClickDate: (date: string) => void;
}) {
  const calendarRef = useRef(null);
  // 더미데이터
  const results = [
    {
      calendarId: 2001,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '14일 일정',
      description: '기획 회의',
      startTime: '2025-07-14T02:01:35',
      endTime: '2025-07-14T02:01:35',
    },
    {
      calendarId: 2002,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '24-25',
      description: '기획 회의',
      startTime: '2025-07-24T02:01:35',
      endTime: '2025-07-25T18:01:35',
    },

    {
      calendarId: 2003,
      writerId: 12,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '기능개발',
      description: '기획 회의',
      startTime: '2025-07-17T02:01:35',
      endTime: '2025-07-18T03:01:35',
    },
    {
      calendarId: 2004,
      writerId: 123,
      writerNickname: '유강현',
      writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
      teamId: 101,
      title: '달력 기능 개발',
      description: '기획 회의',
      startTime: '2025-07-18T02:01:35',
      endTime: '2025-07-20T03:18:35',
    },
  ];
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
  const userColors = results.reduce<UserColor[]>((acc, crr) => {
    const x = acc.find((item) => item.id === crr.writerId);
    if (!x) {
      acc.push({ id: crr.writerId, color: colors[acc.length % colors.length] });
    }
    return acc;
  }, []);

  // 달력 라이브러리에 넘겨줄 값으로 변경
  const formating = results.map((result) => {
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
