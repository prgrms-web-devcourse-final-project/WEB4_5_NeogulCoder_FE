'use client';

import ScheduleTooltip from '@/components/study/ScheduleTooltip';
import SubmitScheduleModal from '@/components/study/SubmitScheduleModal';
import TimeGrid from '@/components/study/TimeGrid';
import { TimeVoteStatsType, TimeVoteSubmissionsType } from '@/types/schedule';
import { formatDate } from '@/utils/formatDate';
import { BadgeQuestionMark } from 'lucide-react';
import { useState } from 'react';
import DeleteScheduleModal from './DeleteScheduleModal';
import { useParams } from 'next/navigation';

export default function StudyScheduleClient({
  initialTimeVoteStats,
  initialTimeVoteSubmissions,
  isLeader,
}: {
  initialTimeVoteStats: TimeVoteStatsType;
  initialTimeVoteSubmissions: TimeVoteSubmissionsType;
  isLeader: boolean;
}) {
  const { id } = useParams();

  const [isShown, setIsShown] = useState(false);
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [timeVoteSubmissions, setTimeVoteSubmissions] = useState(
    initialTimeVoteSubmissions
  );

  const handleCloseSubmitModal = () => setIsOpenSubmitModal(false);
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

  return (
    <>
      <div className='w-full relative'>
        {isShown && (
          <div className='absolute top-13 right-6 z-10'>
            <ScheduleTooltip />
          </div>
        )}
        <div className='flex justify-between items-center'>
          <div className='tb2 text-text1'>모임 일정 조율</div>
          <BadgeQuestionMark
            className='w-6 h-6 text-main opacity-70 hover:opacity-100'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          />
        </div>
        <div className='flex justify-between items-center mt-6'>
          <span className='tm3'>
            {formatDate(initialTimeVoteStats.startDate, 'YYYY년 M월 D일 dddd')}{' '}
            ~ {formatDate(initialTimeVoteStats.endDate, 'YYYY년 M월 D일 dddd')}
          </span>
          <div className='flex items-center gap-3 tm4 text-white'>
            <button
              className='w-[90px] h-[30px] bg-main rounded-[10px] hover:bg-[#292929]'
              onClick={() => setIsOpenSubmitModal(true)}
            >
              제출 현황
            </button>
            <button
              className='w-[90px] h-[30px] bg-main rounded-[10px] hover:bg-[#292929]'
              onClick={() => setIsOpenDeleteModal(true)}
            >
              전체 지우기
            </button>
          </div>
        </div>
        <div className='mt-[60px]'>
          <TimeGrid
            initialTimeVoteStats={initialTimeVoteStats}
            isLeader={isLeader}
            isOpenDeleteModal={isOpenDeleteModal}
            setTimeVoteSubmissions={setTimeVoteSubmissions}
          />
        </div>
      </div>

      {isOpenDeleteModal && (
        <DeleteScheduleModal
          studyId={Number(id)}
          onClose={handleCloseDeleteModal}
        />
      )}
      {isOpenSubmitModal && (
        <SubmitScheduleModal
          timeVoteSubmissions={timeVoteSubmissions}
          onClose={handleCloseSubmitModal}
        />
      )}
    </>
  );
}
