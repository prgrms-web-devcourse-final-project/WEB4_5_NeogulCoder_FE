'use client';

import { setTimeVotePeriods } from '@/lib/api/schedule';
import { formatDate } from '@/utils/formatDate';
import dayjs from 'dayjs';
// import { CalendarDays, X } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const CalendarDays = dynamic(
  () => import('lucide-react').then((m) => m.CalendarDays),
  { ssr: false }
);
const X = dynamic(() => import('lucide-react').then((m) => m.X), {
  ssr: false,
});

export default function SetPeriodModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleClick = async () => {
    try {
      const start = formatDate(startDate, 'YYYY-MM-DDT00:00:00');
      const end = formatDate(endDate, 'YYYY-MM-DDT23:59:59');
      await setTimeVotePeriods(studyId, start, end);
      onClose();
      window.location.reload();
      // toast message
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='w-[580px] flex flex-col gap-12 px-9 py-7 rounded-[10px] bg-white drop-shadow-md'>
          <div className='flex justify-between'>
            <span className='tm2'>기간 설정</span>
            <button onClick={onClose}>
              <X className='w-8 y-8' />
            </button>
          </div>
          <div>
            <div className='shrink-0'>
              <p className='t3'>
                기간 <span className='tm5 text-red'>(필수)</span>
              </p>
              <div className='flex items-center gap-3 my-3'>
                <label className='w-full relative'>
                  <input
                    type='date'
                    value={startDate}
                    className='date-custom w-full input-type2 tm3 pr-9!'
                    onChange={(e) => setStartDate(e.target.value)}
                    min={
                      endDate &&
                      dayjs(endDate).subtract(6, 'day').format('YYYY-MM-DD')
                    }
                    max={endDate && dayjs(endDate).format('YYYY-MM-DD')}
                  />
                  <CalendarDays
                    strokeWidth={1}
                    className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2'
                  />
                </label>
                <p className='tm3 shrink-0'>~</p>
                <label className='w-full relative'>
                  <input
                    type='date'
                    value={endDate}
                    className='date-custom w-full input-type2 tm3 pr-9!'
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate && dayjs(startDate).format('YYYY-MM-DD')}
                    max={
                      startDate &&
                      dayjs(startDate).add(6, 'day').format('YYYY-MM-DD')
                    }
                  />
                  <CalendarDays
                    strokeWidth={1}
                    className='w-5 h-5 text-gray5 absolute right-3 top-1/2 -translate-y-1/2'
                  />
                </label>
              </div>
              <span className='tm5 text-red flex justify-end'>
                *최대 7일까지만 가능합니다.
              </span>
            </div>
            <div className='mt-12'>
              <button className='button-modal1' onClick={handleClick}>
                요청
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
