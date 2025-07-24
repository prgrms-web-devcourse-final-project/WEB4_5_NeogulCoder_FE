'use client';
import { useState } from 'react';
import CalendarSmall from './CalendarSmall';
import CalendarSmallDetail from './CalendarSmallDetail';
import dayjs from 'dayjs';

export default function CalendarSmallShell({
  studyId,
  calendarData,
}: {
  studyId: number;
  calendarData: StudyScheduleType[];
}) {
  const [clickDate, setClickDate] = useState(dayjs().format('YYYY-MM-DD'));
  const handleClickDate = (date: string) => {
    setClickDate(date);
  };

  console.log('calendarData', calendarData);
  return (
    <>
      <div>
        <CalendarSmall
          calendarData={calendarData}
          handleClickDate={handleClickDate}
        />
      </div>
      <div className='h-full min-h-0 shrink-0'>
        <CalendarSmallDetail
          calendarData={calendarData}
          date={clickDate}
          studyId={studyId}
        />
      </div>
    </>
  );
}
