'use client';

import { useRouter } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';
import { useMemo } from 'react';
import SideMenuSkeleton from './SideMenuSkeleton';
import { useStudyStore } from '@/stores/studyInfoStore';

type rawMenuItemsType = {
  name: string;
  to: string;
  onlyLeader?: boolean;
};

export default function SideMenu({
  studyId,
  my,
}: {
  studyId: number;
  my?: StudyMyDataType;
}) {
  // 사이트메뉴의 스터디 정보 관리를 위한 전역상태
  const studyInfo = useStudyStore().study;
  const isLoading = useStudyStore().isLoading;
  const router = useRouter();
  const leader = my?.role === 'LEADER';

  // 가지고 있는 사이드 메뉴
  const menuItems = useMemo(() => {
    const rawMenuItems: rawMenuItemsType[] = [
      { name: '스터디 대시보드', to: `/study/${studyId}/dashboard` },
      { name: '팀 캘린더', to: `/study/${studyId}/calendar` },
      { name: '모임 일정 조율', to: `/study/${studyId}/study-schedule` },
      { name: '스터디 커뮤니티', to: `/study/${studyId}/study-community` },
      { name: '팀 채팅', to: `/study/${studyId}/chat` },
      {
        name: '스터디 관리',
        to: `/study/${studyId}/management`,
        onlyLeader: true,
      },
    ];
    return rawMenuItems.filter((item) => !item.onlyLeader || leader);
  }, [leader, studyId]);

  return (
    <>
      <div>
        {isLoading ? (
          <SideMenuSkeleton />
        ) : (
          <>
            {studyInfo && <SideStudyInfo studyInfo={studyInfo} />}
            <button
              onClick={() => router.push(`/study/${studyId}/my-study-info`)}
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
          </>
        )}
      </div>
    </>
  );
}
