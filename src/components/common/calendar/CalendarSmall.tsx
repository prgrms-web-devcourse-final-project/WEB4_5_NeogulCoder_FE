'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import '@/styles/calendar/calendar.css';

export default function CalendarSmall() {
  const calendarRef = useRef(null);
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
              dayFormat: { day: 'numeric' }, // 숫자만 보이게
            },
            dayGridWeek: {
              dayFormat: { weekday: 'short', day: 'numeric' }, // 요일+숫자
            },
          }}
          events={[
            { title: 'Meeting', date: '2025-07-11', color: '#FEE6C9' },
            { title: 'Meeting', date: '2025-07-12', color: '#FEE6C9' },
            { title: 'Meeting', date: '2025-07-01', color: '#FEE6C9' },
            { title: 'Meeting', date: '2025-07-22', color: '#D2F0FF' },
            { title: 'Meeting', date: '2025-07-12', color: '#D2F0FF' },
            { title: 'Meeting', date: '2025-07-12', color: '#D2F0FF' },
            { title: 'Meeting', date: '2025-07-12', color: '#D2F0FF' },
            { title: 'Meeting', date: '2025-07-12', color: '#D2F0FF' },
            { title: 'Meeting', date: '2025-07-12', color: '#D2F0FF' },
            { title: 'Lunch', date: '2025-07-15', color: '#FEE6C9' },
          ]}
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
