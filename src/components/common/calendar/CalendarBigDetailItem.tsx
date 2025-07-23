'use client';

import { dayFormatting } from '@/utils/day';
import {
  Clock,
  EllipsisVertical,
  PencilLine,
  Trash2,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CalendarWrite from './CalendarWrite';
import dayjs from 'dayjs';

export default function CalendarBigDetailItem({
  result,
  studyId,
}: {
  result: StudyScheduleType;
  studyId: number;
}) {
  const authId = 12;
  const [open, setOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);
  const startDay = dayjs(result.startTime).format('YYYY-MM-DD');
  const startTime = dayjs(result.startTime).format('HH:mm');
  const endDay = dayjs(result.endTime).format('YYYY-MM-DD');
  const endTime = dayjs(result.endTime).format('HH:mm');

  return (
    <>
      <div className='border border-border1 rounded-[10px] px-5 py-4 relative'>
        <div className='flex justify-between mb-3'>
          <div className='w-full'>
            <p className='tm3 mb-2'>{result.title}</p>
            <div className='flex justify-between items-center'>
              <div>
                <p className='tl4 flex gap-2 mb-1'>
                  <Clock className='w-5 h-5' strokeWidth={1} />
                  {`
                  ${startDay} 
                  (${dayFormatting(startDay)}) ${startTime} ~
                  ${endDay} 
                  (${dayFormatting(endDay)}) ${endTime}
                  `}
                </p>
                <p className='tl4 flex gap-2'>
                  <UserRound className='w-5 h-5' strokeWidth={1} />
                  {result.writerNickname}
                </p>
              </div>
              <div>
                <div className='w-12 h-12 rounded-full overflow-hidden border border-border1'>
                  <Image
                    src={result.writerProfileImageUrl}
                    width={48}
                    height={0}
                    alt='작성자 프로필'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='shrink-0 flex gap-4 items-start absolute right-2 top-3'>
            <div>
              {result.writerId === authId && (
                <button>
                  <EllipsisVertical
                    onClick={() => setOpen(!open)}
                    className='w-5 h-5 text-gray5'
                  />
                </button>
              )}

              {open && (
                <div className='absolute top-0 right-6 bg-white rounded-md drop-shadow-md px-4 w-[110px] py-3 t5 flex flex-col gap-3 items-start'>
                  <button
                    onClick={() => setWriteOpen(true)}
                    className='flex gap-3'
                  >
                    <PencilLine className='w-4 h-4' /> 수정하기
                  </button>
                  <button className='flex gap-3 text-red'>
                    <Trash2 className='w-4 h-4' color='#ff5955' /> 삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='t4'>{result.description}</div>
      </div>
      {writeOpen && (
        <CalendarWrite
          writeCloseHandler={() => setWriteOpen(false)}
          data={result}
          studyId={studyId}
        />
      )}
    </>
  );
}
