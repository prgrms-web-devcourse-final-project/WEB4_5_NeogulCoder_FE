'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';

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
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }, // Separates year and month
            },
          }}
          expandRows={true}
          dayMaxEventRows={0}
        />
      </div>
    </>
  );
}
