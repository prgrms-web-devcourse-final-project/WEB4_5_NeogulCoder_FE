'use client';

import ScheduleTooltip from '@/components/study/ScheduleTooltip';
import SubmitScheduleModal from '@/components/study/SubmitScheduleModal';
import TimeGrid from '@/components/study/TimeGrid';
import { TimeVoteStatsType, TimeVoteSubmissionsType } from '@/types/schedule';
import { formatDate } from '@/utils/formatDate';
import { BadgeQuestionMark, CalendarClock } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteScheduleModal from './DeleteScheduleModal';
import { useParams } from 'next/navigation';
import { fetchTimeVoteStats } from '@/lib/api/schedule';
import ScheduleSkeleton from './ScheduleSkeleton';
import SetPeriodModal from './SetPeriodModal';
import { checkMyRoleInStudy } from '@/lib/api/community';

export default function StudyScheduleClient() {
  const { id } = useParams();

  const [isShown, setIsShown] = useState(false);
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenPeriodModal, setIsOpenPeriodModal] = useState(false);

  const [initialTimeVoteStats, setInitialTimeVoteStats] =
    useState<TimeVoteStatsType>();
  const [timeVoteSubmissions, setTimeVoteSubmissions] =
    useState<TimeVoteSubmissionsType>([]);
  const [isLeader, setIsLeader] = useState(false);

  const [isFetchingVoteStats, setIsFetchingVoteStats] = useState(true);
  const [isFetchingRole, setIsFetchingRole] = useState(true);

  const isFullyLoaded = !isFetchingVoteStats && !isFetchingRole;

  const handleCloseSubmitModal = () => setIsOpenSubmitModal(false);
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);
  const handleClosePeriodModal = () => setIsOpenPeriodModal(false);

  const initVoteStats = async () => {
    setIsFetchingVoteStats(true);
    try {
      const data = await fetchTimeVoteStats(Number(id));
      setInitialTimeVoteStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingVoteStats(false);
    }
  };

  const checkMyRole = async () => {
    setIsFetchingRole(true);
    try {
      const roleData = await checkMyRoleInStudy(Number(id));
      setIsLeader(roleData.role === 'LEADER');
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingRole(false);
    }
  };

  useEffect(() => {
    initVoteStats();
    checkMyRole();
  }, []);

  return (
    <>
      {!isFullyLoaded ? (
        <ScheduleSkeleton />
      ) : (
        <>
          {initialTimeVoteStats ? (
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
                    {formatDate(
                      initialTimeVoteStats.startDate,
                      'YYYY년 M월 D일 dddd'
                    )}{' '}
                    ~{' '}
                    {formatDate(
                      initialTimeVoteStats.endDate,
                      'YYYY년 M월 D일 dddd'
                    )}
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
                    isLeader={isLeader}
                    isOpenDeleteModal={isOpenDeleteModal}
                    initialTimeVoteStats={initialTimeVoteStats}
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
          ) : (
            <>
              {!initialTimeVoteStats && (
                // 84px ?
                <div
                  className='w-full relative h-[calc(100vh-105px-113px)]
          '
                >
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
                  <div className='flex flex-col gap-6 justify-center items-center absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex flex-col gap-3'>
                      <CalendarClock
                        className='mx-auto mb-3 w-[50px] h-[50px] text-border3'
                        strokeWidth={1}
                      />
                      <span className='tm3 text-border3 mb-3'>
                        스터디장이 아직 기간 설정을 하지 않았습니다.
                      </span>
                    </div>
                    {isLeader && (
                      <button
                        className='w-[235px] h-[48px] bg-main rounded-[10px] tm3 text-white hover:bg-[#292929]'
                        onClick={() => setIsOpenPeriodModal(true)}
                      >
                        가능 시간 요청
                      </button>
                    )}
                  </div>
                  {isOpenPeriodModal && (
                    <SetPeriodModal
                      studyId={Number(id)}
                      onClose={handleClosePeriodModal}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
