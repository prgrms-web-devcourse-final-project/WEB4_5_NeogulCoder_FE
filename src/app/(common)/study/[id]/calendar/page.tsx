'use client';
import CalendarBig from '@/components/common/calendar/CalendarBig';
import CalendarBigDetail from '@/components/common/calendar/CalendarBigDetail';
import CalendarWrite from '@/components/common/calendar/CalendarWrite';
import { useState } from 'react';

export default function Calendar() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);
  const openHandler = () => {
    setDetailOpen(true);
  };
  const closeHandler = () => {
    setDetailOpen(false);
  };

  const writeOpenHandler = () => {
    setWriteOpen(true);
  };
  const writeCloseHandler = () => {
    setWriteOpen(false);
  };
  return (
    <>
      <div>
        <h1 className='tb3'>팀 캘린더</h1>
      </div>
      <div className='flex justify-end mb-3'>
        <button onClick={writeOpenHandler} className='button-sm-type1'>
          일정등록
        </button>
      </div>
      <CalendarBig openHandler={openHandler} />
      {detailOpen && <CalendarBigDetail closeHandler={closeHandler} />}
      {writeOpen && <CalendarWrite writeCloseHandler={writeCloseHandler} />}
    </>
  );
}
