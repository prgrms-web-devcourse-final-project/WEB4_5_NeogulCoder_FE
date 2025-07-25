'use client';
import StudyAttendance from '@/components/study-room/dashboard/StudyAttendance';
import StudyInfoCard from '@/components/study-room/dashboard/StudyInfoCard';
import { ChevronRight, MessageCircleDashed } from 'lucide-react';
import StudyPostItem from '@/components/study-room/dashboard/StudyPostItem';

import Link from 'next/link';
import CalendarSmallShell from '@/components/common/calendar/CalendarSmallShell';
import { useParams } from 'next/navigation';
import { useStudyStore } from '@/stores/studyInfoStore';
import { useEffect, useState } from 'react';
import { getStudyDashboard } from '@/lib/api/study.api';
import StudyDashboardSkeleton from '@/components/study-room/dashboard/StudyDashboardSkeleton';

export default function DashBoard() {
  const params = useParams();
  const studyId = Number(params.id);
  const studyInfo = useStudyStore().study;
  const studyIsProgress = useStudyStore().isProgress;
  const [studyData, setStudyData] = useState<StudyDashboardType>();
  const [studyCalendar, setStudyCalendar] = useState<StudyScheduleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const { data } = await getStudyDashboard(studyId);
        setStudyData(data);
        setStudyCalendar(data.teamCalendars);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, [studyId]);

  const studyInfos = [
    {
      title: '스터디 총 참여 가능 기간',
      data: `${studyData?.totalDays}`,
      type: 'day',
    },
    {
      title: '스터디 총 인원',
      data: `${studyData?.currentCount.toString()}`,
      subData: `${studyData?.capacity.toString()}`,
      type: 'personnel',
    },
    {
      title: '스터디 총 게시물',
      data: `${studyData?.totalPostCount}`,
      type: 'post',
    },
  ];

  return (
    <>
      {isLoading ? (
        <StudyDashboardSkeleton />
      ) : (
        <>
          <div className='flex gap-3 items-end leading-0 mb-10'>
            <p className='t4 text-gray3'>
              {/* 스터디 이름 조회 */}
              <span className='tb3 text-text1 mr-1'>{studyInfo?.name}</span>와
              <span className='text-green tm3'> {studyData?.progressDays}</span>
              일 스터디 중!
            </p>
          </div>
          <div className='flex gap-6 mb-12'>
            <div className='shrink-0'>
              <StudyAttendance
                studyId={studyId}
                totalDays={studyData?.totalDays ?? 1}
              />
            </div>
            <div className='w-full'>
              <h3 className='tb3 mb-[18px]'>스터디 세부정보</h3>
              <div className='flex flex-col gap-3'>
                {studyInfos.map((info) => (
                  <StudyInfoCard
                    key={`${studyInfo?.name}${info.title}`}
                    title={info.title}
                    data={info.data}
                    type={info.type}
                    subData={info.subData}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='mb-12'>
            <h3 className='tb3 mb-[18px]'>스터디 일정</h3>
            <div className='grid h-[400px] grid-cols-2 border border-border1 rounded-[10px] py-6'>
              <CalendarSmallShell
                studyId={studyId}
                calendarData={studyCalendar}
              />
            </div>
          </div>
          <div className='mb-12'>
            <div className='flex justify-between mb-[18px]'>
              <h3 className='tb3'>스터디 공지사항</h3>

              <Link
                href={`/study/${studyId}/study-community`}
                className='flex items-center t5'
              >
                더보기 <ChevronRight className='w-4 h-4' />
              </Link>
            </div>
            <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
              {studyData?.noticePosts && studyData?.noticePosts.length > 0 ? (
                studyData?.noticePosts.map((post) => (
                  <StudyPostItem
                    key={post.postId}
                    data={post}
                    studyId={studyId}
                  />
                ))
              ) : (
                <div className='flex h-full justify-center flex-col gap-5'>
                  <div className='text-center'>
                    <MessageCircleDashed
                      className='mx-auto mb-3 w-[50px] h-[50px] text-border2'
                      strokeWidth={1}
                    />
                    <p className='tm4 text-border2  mb-3'>
                      스터디 커뮤니티에 공지글이 없습니다.
                    </p>
                    {studyIsProgress && (
                      <Link
                        href={`/study/${studyId}/study-community/write`}
                        className='button-sm-type1  !text-[12px]'
                      >
                        작성하러 가기
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='mb-12'>
            <div className='flex justify-between  mb-[18px]'>
              <h3 className='tb3'>스터디 최신글</h3>
              <Link
                href={`/study/${studyId}/study-community`}
                className='flex items-center t5'
              >
                더보기 <ChevronRight className='w-4 h-4' />
              </Link>
            </div>
            <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
              {studyData?.freePosts && studyData?.freePosts.length > 0 ? (
                studyData?.freePosts.map((post) => (
                  <StudyPostItem
                    key={post.postId}
                    data={post}
                    studyId={studyId}
                  />
                ))
              ) : (
                <div className='flex h-full justify-center flex-col gap-5'>
                  <div className='text-center'>
                    <MessageCircleDashed
                      className='mx-auto mb-3 w-[50px] h-[50px] text-border2'
                      strokeWidth={1}
                    />
                    <p className='tm4 text-border2 mb-3'>
                      스터디 커뮤니티에 게시글이 없습니다.
                    </p>
                    {studyIsProgress && (
                      <Link
                        href={`/study/${studyId}/study-community/write`}
                        className='button-sm-type1 !text-[12px]'
                      >
                        작성하러 가기
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
