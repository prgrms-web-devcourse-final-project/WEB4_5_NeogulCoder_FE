'use client';

import { useRouter } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';

export default function SideMenu() {
  const router = useRouter();

  const menuItems = [
    { name: '스터디 대시보드', to: '/study/10/dashboard' },
    { name: '팀 캘린더', to: '/study/10/calendar' },
    { name: '모임 일정 조율', to: '/study/10/study-schedule' },
    { name: '스터디 커뮤니티', to: '/study/10/study-community' },
    { name: '팀 채팅', to: '/study/10/chat' },
    { name: '스터디 관리', to: '/study/10/management' },
  ];
  // 추후에 실제 study/1 을 실제 study/id로 수정해주세요!
  return (
    <>
      <div>
        <SideStudyInfo name='너굴코더' />
        <button
          onClick={() => router.push('/study/1/my-study-info')}
          type='button'
          className='w-full tm4 h-[40px] bg-gray4 rounded-[10px]'
        >
          스터디의 My 정보
        </button>
        <div className='flex flex-col gap-[30px] mt-[35px]'>
          {menuItems.map((item) => (
            <SideMenuItem key={item.to} name={item.name} to={item.to} />
          ))}
        </div>
      </div>
    </>
  );
}
