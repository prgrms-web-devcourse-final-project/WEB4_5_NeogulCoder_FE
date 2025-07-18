'use client';
import { useState } from 'react';
import CalendarSmall from './CalendarSmall';
import CalendarSmallDetail from './CalendarSmallDetail';
import dayjs from 'dayjs';

export default function CalendarSmallShell({ studyId }: { studyId: string }) {
  const [clickDate, setClickDate] = useState(dayjs().format('YYYY-MM-DD'));
  const handleClickDate = (date: string) => {
    setClickDate(date);
  };
  return (
    <>
      <div>
        <CalendarSmall handleClickDate={handleClickDate} />
      </div>
      <div className='h-full min-h-0 shrink-0'>
        <CalendarSmallDetail date={clickDate} studyId={studyId} />
      </div>
    </>
  );
}
