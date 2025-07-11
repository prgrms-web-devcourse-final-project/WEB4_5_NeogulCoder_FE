'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import '@/styles/calendar/calendar.css';

export default function CalendarBig({ openHandler }: { openHandler: () => void }) {
  const calendarRef = useRef(null);

  const handleDateClick = (arg: any) => {
    // 날짜 클릭 시 동작
    alert('date click! ' + arg.dateStr);
    openHandler();
  };
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
          dateClick={handleDateClick}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }, // Separates year and month
            },
          }}
          expandRows={true}
          height='auto'
          contentHeight='auto'
          dayMaxEventRows={4}
          dayCellClassNames={() => 'h-[120px]'}
        />
      </div>
    </>
  );
}
