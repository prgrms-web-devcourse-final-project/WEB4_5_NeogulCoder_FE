'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef } from 'react';

export default function StudyAttendance() {
  const calendarRef = useRef(null);
  return (
    <>
      <div className='flex justify-between mb-3'>
        <h3 className='tm2'>나의 스터디 출석정보</h3>
        <button className='button-sm-type1'>출석</button>
      </div>
      <div className='border border-border1 rounded-[10px] p-6'>
        <div className='mb-17'>
          <h3 className='tm2 mb-[18px]'>주간 출석</h3>
          <div className='w-[500px]'>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView='dayGridWeek'
              locale={koLocale}
              events={[
                { title: 'Meeting', date: '2025-07-11', color: '#FEE6C9' },
                { title: 'Meeting', date: '2025-07-22', color: '#FEE6C9' },
              ]}
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              dayHeaderFormat={{
                weekday: 'narrow',
              }}
              dayMaxEventRows={1}
              height='auto'
              contentHeight='auto'
            />
          </div>
        </div>
        <div>
          <h3 className='tm2'>전체 출석률</h3>
          <div>
            <div className='text-right tb5 mb-1.5'>60%</div>
            <div className='w-full h-[18px] rounded-2xl bg-gray3/50 overflow-hidden'>
              <div className='w-60/100 h-full bg-orange'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
