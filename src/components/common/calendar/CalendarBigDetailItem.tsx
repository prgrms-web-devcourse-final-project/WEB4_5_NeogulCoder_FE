'use client';

import { dayFormatting } from '@/utils/day';
import Image from 'next/image';
import { useState } from 'react';
import CalendarWrite from './CalendarWrite';
import dayjs from 'dayjs';
import defaultUserProfileImage from '@/assets/images/basic-bunny.svg';
import { userAuthStore } from '@/stores/userStore';
import { ScheduleInputType } from './CalendarBigShell';
import CalendarDeleteCheckModal from './CalendarDeleteCheckModal';
import {
  Clock,
  EllipsisVertical,
  PencilLine,
  Trash2,
  UserRound,
} from 'lucide-react';

export default function CalendarBigDetailItem({
  type,
  result,
  category,
  handleDelete,
  handleUpdate,
}: {
  type: string;
  result: UnionScheduleType;
  category: { name: string; id: number; isProgress: boolean };
  handleDelete: (calendarId: number) => void;
  handleUpdate: (id: number, data: ScheduleInputType) => void;
}) {
  const authId = userAuthStore().user?.id;
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const startDay = dayjs(result.startTime).format('YYYY-MM-DD');
  const startTime = dayjs(result.startTime).format('HH:mm');
  const endDay = dayjs(result.endTime).format('YYYY-MM-DD');
  const endTime = dayjs(result.endTime).format('HH:mm');

  return (
    <>
      <div className='border border-border1 rounded-[10px] px-3 py-2.5 lg:px-5 lg:py-4 relative'>
        <div className='flex justify-between mb-3'>
          <div className='w-full'>
            <p className='tm3 mb-2'>{result.title}</p>
            <div className='flex justify-between items-center'>
              <div>
                <p className='tl4 text-[10px] flex gap-1 lg:gap-2 mb-1'>
                  <Clock
                    className='w-3.5 h-3.5 lg:w-5 lg:h-5'
                    strokeWidth={1}
                  />
                  {`
                  ${startDay} 
                  (${dayFormatting(startDay)}) ${startTime} ~
                  ${endDay} 
                  (${dayFormatting(endDay)}) ${endTime}
                  `}
                </p>
                <p className='tl4 text-[10px] flex gap-1 lg:gap-2'>
                  <UserRound
                    className='w-3.5 h-3.5 lg:w-5 lg:h-5'
                    strokeWidth={1}
                  />
                  {result.writerNickname}
                </p>
              </div>
              <div>
                <div className='w-9 h-9 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-border1'>
                  <Image
                    src={
                      result.writerProfileImageUrl ?? defaultUserProfileImage
                    }
                    width={48}
                    height={48}
                    alt='작성자 프로필'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='shrink-0 flex gap-4 items-start absolute right-2 top-3'>
            <div>
              {result.writerId === authId && category.isProgress && (
                <button>
                  <EllipsisVertical
                    onClick={() => setOpen(!open)}
                    className='w-4 h-4 lg:w-5 lg:h-5 text-gray5'
                  />
                </button>
              )}

              {open && (
                <div className='absolute top-0 right-6 bg-white rounded-md drop-shadow-md px-4 lg:px-4 w-[90px] lg:w-[110px] py-2 lg:py-3 t5 flex flex-col gap-3 items-start'>
                  <button
                    onClick={() => {
                      setWriteModalOpen(true);
                      setOpen(false);
                    }}
                    className='flex gap-2 lg:gap-3'
                  >
                    <PencilLine className='w-3 h-3 lg:w-4 lg:h-4' /> 수정하기
                  </button>
                  <button
                    onClick={() => {
                      setDeleteModalOpen(true);
                      setOpen(false);
                    }}
                    className='flex gap-2 lg:gap-3 text-red'
                  >
                    <Trash2 className='w-3 h-3 lg:w-4 lg:h-4' color='#ff5955' />{' '}
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='t4'>{result.description}</div>
      </div>
      {writeModalOpen && (
        <CalendarWrite
          type={type}
          writeCloseHandler={() => setWriteModalOpen(false)}
          data={result}
          categoryId={category.id}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalOpen && (
        <CalendarDeleteCheckModal
          closeModal={() => setDeleteModalOpen(false)}
          handleDelete={() => handleDelete(result.scheduleId)}
        />
      )}
    </>
  );
}
