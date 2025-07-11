'use client';

import { Clock, EllipsisVertical, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CalendarBigDetailItem() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='border border-border1 rounded-[10px] px-5 py-4'>
        <div className='flex justify-between mb-3'>
          <div className='w-full'>
            <p className='tm2 mb-2'>Meeting</p>
            <div className='flex justify-between items-center'>
              <div>
                <p className='tl4 flex gap-2 mb-1'>
                  <Clock className='w-5 h-5' strokeWidth={1} /> 2025-07-15 (화) 09:00 ~ 2025-07-15(화) 15:00
                </p>
                <p className='tl4 flex gap-2'>
                  <UserRound className='w-5 h-5' strokeWidth={1} /> 한유빈
                </p>
              </div>
              <div>
                <div className='w-12 h-12 rounded-full overflow-hidden border border-border1'>
                  <Image
                    src='https://i.pinimg.com/1200x/ed/fd/4a/edfd4a136c502cb30f776751da37b7b1.jpg'
                    width={48}
                    height={0}
                    alt='작성자 프로필'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='shrink-0 flex gap-4 items-start'>
            <div className='relative'>
              <button>
                <EllipsisVertical onClick={() => setOpen(!open)} className='w-5 h-5 text-gray5' />
              </button>
              {open && (
                <div className='absolute top-0 right-7 bg-white rounded-md drop-shadow-md px-4 w-[90px] py-2 t5 flex flex-col gap-1 items-start'>
                  <button>수정하기</button>
                  <button className='text-red'>삭제하기</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='t4'>
          정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시
          30일전까지 이를 의결하여야 한다. 대통령은 제4항과 제5항의 규정에 의하여 확정된 법률을
        </div>
      </div>
    </>
  );
}
