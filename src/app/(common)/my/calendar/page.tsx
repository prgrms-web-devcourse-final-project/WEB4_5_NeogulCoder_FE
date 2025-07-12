'use client';

import CalendarBig from '@/components/common/calendar/CalendarBig';
import CalendarBigDetail from '@/components/common/calendar/CalendarBigDetail';
import CalendarWrite from '@/components/common/calendar/CalendarWrite';
import { ChevronDown } from 'lucide-react';
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
        <h1 className='tm1 mb-6'>팀 캘린더</h1>
      </div>
      <div className='flex justify-between items-end mb-3'>
        <div className='flex items-center t1'>
          <div className='w-2 h-8 rounded-full bg-logo2'></div>
          <div className='w-full relative z-1'>
            <select className='w-full h-10 appearance-none pl-3 pr-9!'>
              <option>내 일정</option>
              <option>스터디 A일정</option>
              <option>스터디 B일정</option>
            </select>
            <ChevronDown className='absolute w-6 h-6 right-3 top-1/2 -translate-y-1/2 -z-1' />
          </div>
        </div>
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
