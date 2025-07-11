import CalendarSmall from '@/components/common/calendar/CalendarSmall';
import CalendarSmallDetail from '@/components/common/calendar/CalendarSmallDetail';
import PostItem from '@/components/study-room/dashboard/StudyPostItem';
import StudyAttendance from '@/components/study-room/dashboard/StudyAttendance';
import StudyInfoCard from '@/components/study-room/dashboard/StudyInfoCard';
import { ChevronRight } from 'lucide-react';
import StudyPostItem from '@/components/study-room/dashboard/StudyPostItem';
import SmallModal from '@/components/study-room/dashboard/smallModal';
import SmallModal2 from '@/components/study-room/dashboard/SmallModal2';

export default function DashBoard() {
  const studyInfos = [
    { title: '스터디 총 기간', data: '+99999', type: 'day' },
    { title: '스터디 총 인원', data: '6', subData: '9', type: 'personnel' },
    { title: '스터디 총 게시물', data: '1,238', type: 'post' },
  ];
  return (
    <>
      <div className='flex gap-6 mb-9'>
        <div className='w-full'>
          <h3 className='tm2 mb-[18px]'>스터디 세부정보</h3>
          <div className='flex flex-col gap-3'>
            {studyInfos.map((info, i) => (
              <StudyInfoCard key={i} title={info.title} data={info.data} type={info.type} subData={info.subData} />
            ))}
          </div>
        </div>
        <div>
          <StudyAttendance />
        </div>
      </div>
      <div className='mb-9'>
        <h3 className='tm2 mb-[18px]'>스터디 일정</h3>
        <div className='grid h-[400px] grid-cols-2 border border-border1 rounded-[10px] py-6'>
          <div>
            <CalendarSmall />
          </div>
          <div className='h-full min-h-0 shrink-0'>
            <CalendarSmallDetail />
          </div>
        </div>
      </div>
      <div className='mb-9'>
        <div className='flex justify-between mb-[18px]'>
          <h3 className='tm2'>스터디 공지사항</h3>

          <button className='flex items-center tm5'>
            더보기 <ChevronRight className='w-5 h-5' />
          </button>
        </div>
        <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
          <StudyPostItem type='공지' />
          <StudyPostItem type='공지' />
        </div>
      </div>
      <div className='mb-9'>
        <div className='flex justify-between  mb-[18px]'>
          <h3 className='tm2'>스터디 최신글</h3>
          <button className='flex items-center tm5'>
            더보기 <ChevronRight className='w-5 h-5' />
          </button>
        </div>
        <div className='border border-border1 rounded-[10px] flex flex-col p-6 gap-4'>
          <StudyPostItem type='new' />
          <StudyPostItem type='new' />
          <StudyPostItem type='new' />
        </div>
      </div>
      <SmallModal />
      <SmallModal2 />
    </>
  );
}
