import CalendarSmall from '@/components/common/calendar/CalendarSmall';
import CalendarSmallDetail from '@/components/common/calendar/CalendarSmallDetail';
import StudyAttendance from '@/components/study-room/dashboard/StudyAttendance';
import StudyInfoCard from '@/components/study-room/dashboard/StudyInfoCard';
import { ChevronRight } from 'lucide-react';
import StudyPostItem from '@/components/study-room/dashboard/StudyPostItem';

import StudyExtendCheckModal from '@/components/study-room/dashboard/StudyExtendCheckModal';
import {
  getStudyDashBoardData,
  getStudyHeaderData,
} from '@/lib/api/studydashboard';
import Link from 'next/link';

export default async function DashBoard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getStudyDashBoardData(Number(id));
  const { data: studyHeaderData } = await getStudyHeaderData(Number(id));
  console.log(data, studyHeaderData);
  const studyData = {
    progressDays: 45,
    totalDays: 320,
    capacity: 4,
    currentCount: 3,
    attendances: [
      {
        studyId: 1,
        userId: 2,
        attendanceDate: '2025-07-10',
      },
      {
        studyId: 1,
        userId: 2,
        attendanceDate: '2025-07-15',
      },
      {
        studyId: 1,
        userId: 2,
        attendanceDate: '2025-07-16',
      },
    ],
    teamCalenders: [
      {
        scheduleId: 2001,
        teamId: 101,
        writerId: 123,
        writerNickname: '유강현',
        writerProfileImageUrl: 'https://wibby.com/profile/유강현.jpg',
        title: '스터디A',
        description: '기획 회의',
        startTime: '2025-07-16T06:33:12.800Z',
        endTime: '2025-07-16T06:33:12.800Z',
      },
    ],
    studyPosts: [
      {
        id: 12,
        title: '모든 국민은 직업선택의 자유를 가진다.',
        category: 'NOTICE',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-16T06:33:12.800Z',
        commentCount: 3,
      },
      {
        id: 13,
        title: '2모든 국민은 직업선택의 자유를 가진다.',
        category: 'NOTICE',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-16T06:33:12.800Z',
        commentCount: 3,
      },
      {
        id: 14,
        title: '공유글1모든 국민은 직업선택의 자유를 가진다.',
        category: '',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-16T06:33:12.800Z',
        commentCount: 3,
      },
      {
        id: 15,
        title: '2공유글모든 국민은 직업선택의 자유를 가진다.',
        category: '',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-16T01:33:12.800Z',
        commentCount: 3,
      },
      {
        id: 16,
        title: '3공유글모든 국민은 직업선택의 자유를 가진다.',
        category: '',
        content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
        createdDate: '2025-07-15T06:33:12.800Z',
        commentCount: 3,
      },
    ],
  };

  const studyInfos = [
    {
      title: '스터디 총 기간',
      data: `+${studyData.totalDays}`,
      type: 'day',
    },
    {
      title: '스터디 총 인원',
      data: studyData.currentCount.toString(),
      subData: studyData.capacity.toString(),
      type: 'personnel',
    },
    { title: '스터디 총 게시물', data: '1,238', type: 'post' },
  ];
  const noticeLists = studyData.studyPosts.filter(
    (f) => f.category === 'NOTICE'
  );
  const normalLists = studyData.studyPosts.filter(
    (f) => f.category !== 'NOTICE'
  );
  return (
    <>
      <div className='flex gap-3 items-end leading-0 mb-10'>
        <p className='t4 text-gray3'>
          {/* 스터디 이름 조회 */}
          <span className='tb3 text-text1 mr-1'>{studyHeaderData.name}</span>와
          <span className='text-green tm3'> {studyData.progressDays}</span>일
          스터디 중!
        </p>
      </div>

      <div className='flex gap-6 mb-12'>
        <div>
          <StudyAttendance
            data={studyData.attendances}
            total={studyData.totalDays}
          />
        </div>
        <div className='w-full'>
          <h3 className='tb3 mb-[18px]'>스터디 세부정보</h3>
          <div className='flex flex-col gap-3'>
            {studyInfos.map((info, i) => (
              <StudyInfoCard
                key={i}
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
          <div>
            <CalendarSmall />
          </div>
          <div className='h-full min-h-0 shrink-0'>
            <CalendarSmallDetail />
          </div>
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between mb-[18px]'>
          <h3 className='tb3'>스터디 공지사항</h3>

          <Link
            href={`/study/${id}/study-community`}
            className='flex items-center t5'
          >
            더보기 <ChevronRight className='w-4 h-4' />
          </Link>
        </div>
        <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
          {noticeLists.map((list) => (
            <StudyPostItem key={list.id} data={list} />
          ))}
        </div>
      </div>
      <div className='mb-12'>
        <div className='flex justify-between  mb-[18px]'>
          <h3 className='tb3'>스터디 최신글</h3>
          <Link
            href={`/study/${id}/study-community`}
            className='flex items-center t5'
          >
            더보기 <ChevronRight className='w-4 h-4' />
          </Link>
        </div>
        <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
          {normalLists.map((list) => (
            <StudyPostItem key={list.id} data={list} />
          ))}
        </div>
      </div>
      {/* 스터디 연장 여부 모달 */}
      {/* <StudyExtendCheckModal /> */}
    </>
  );
}
