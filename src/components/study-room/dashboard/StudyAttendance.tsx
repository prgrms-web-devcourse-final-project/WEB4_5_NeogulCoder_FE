'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef } from 'react';
import '@/styles/attendance/attendance.css';

export default function StudyAttendance() {
  const calendarRef = useRef(null);
  return (
    <>
      <div className='flex justify-between mb-3'>
        <h3 className='tb2'>나의 스터디 출석정보</h3>
        <button className='button-sm-type1'>출석</button>
      </div>
      <div className='border border-border1 rounded-[10px] p-6'>
        <div className='mb-14'>
          <h3 className='tm3 mb-[18px]'>주간 출석</h3>
          <div className='w-[450px] attendance'>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView='dayGridWeek'
              locale={koLocale}
              events={[
                { title: '출석', date: '2025-07-11' },
                { title: '출석', date: '2025-07-10' },
                { title: '출석', date: '2025-07-02' },
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
          <h3 className='tm3'>전체 출석률</h3>
          <div>
            <div className='text-right tb5 mb-1.5'>60%</div>
            <div className='w-full h-[16px] rounded-2xl bg-gray3/50 overflow-hidden'>
              <div className='w-60/100 h-full bg-orange'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
