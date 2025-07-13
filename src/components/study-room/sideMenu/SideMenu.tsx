'use client';

import { useRouter } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';

export default function SideMenu() {
  const router = useRouter();
  return (
    <>
      <div>
        <SideStudyInfo name='너굴코더' />
        <button
          onClick={() => router.push('/study/my-study-info')}
          type='button'
          className='w-full tm3 h-[40px] bg-gray4 rounded-[10px]'
        >
          스터디의 My 정보
        </button>
        <div className='flex flex-col gap-[30px] mt-[35px]'>
          <SideMenuItem
            name='스터디 대시보드'
            url='/study/dashboard'
            active={false}
          />
          <SideMenuItem name='팀 캘린더' url='/study/calendar' active={false} />
          <SideMenuItem
            name='모임 시간 조율'
            url='/study/study-schedule'
            active={false}
          />
          <SideMenuItem
            name='스터디 커뮤니티'
            url='/study/study-community'
            active={false}
          />
          <SideMenuItem name='팀 채팅' url='/study/chat' active={true} />
          <SideMenuItem
            name='스터디 관리'
            url='/study/management'
            active={false}
          />
        </div>
      </div>
    </>
  );
}
