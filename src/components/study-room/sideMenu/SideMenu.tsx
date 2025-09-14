'use client';

import { useRouter } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SideStudyInfo from './SideStudyInfo';
import { useEffect, useMemo, useState } from 'react';
import SideMenuSkeleton from './SideMenuSkeleton';
import { useStudyStore } from '@/stores/studyInfoStore';
import Image from 'next/image';
import logoWibby from '@/assets/images/logo-wibby.svg';

type rawMenuItemsType = {
  name: string;
  to: string;
  onlyLeader?: boolean;
};

export default function SideMenu({ studyId }: { studyId: number }) {
  // 사이트메뉴의 스터디 정보 관리를 위한 전역상태
  const studyInfo = useStudyStore().study;
  const isLoading = useStudyStore().isLoading;
  const leader = useStudyStore().leader;
  const router = useRouter();

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
      { name: '스터디의 My 정보', to: `/study/${studyId}/my-study-info` },
    ];
    return rawMenuItems.filter((item) => !item.onlyLeader || leader);
  }, [leader, studyId]);

  const [width, setWidth] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // 최초 세팅
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <SideMenuSkeleton />
        ) : (
          <div className='flex pl-[18px] lg:pl-0  items-center lg:block border-b border-border1 lg:border-b-0'>
            {width >= 1024 ? (
              studyInfo && <SideStudyInfo studyInfo={studyInfo} />
            ) : (
              <div className='relative shrink-0 z-10'>
                <Image
                  onClick={() => setMobileOpen((prev) => !prev)}
                  src={studyInfo?.imageUrl ?? logoWibby}
                  width={32}
                  height={32}
                  alt='스터디로고'
                  className='rounded-[6px] shadow-md cursor-pointer lg:shadow-none lg:cursor-default'
                />
                {studyInfo && (
                  <div className={`${!mobileOpen && 'hidden'}`}>
                    <SideStudyInfo studyInfo={studyInfo} />
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => router.push(`/study/${studyId}/my-study-info`)}
              type='button'
              className='w-full tm4 h-[40px] bg-gray4 rounded-[10px] lg:block hidden'
            >
              스터디의 My 정보
            </button>

            <div className='scroll-custom flex gap-[20px] lg:flex-col lg:gap-[30px] lg:mt-[35px] overflow-x-auto whitespace-nowrap ml-[18px] lg:ml-0 pr-[18px] lg:px-0'>
              {menuItems.map((item) => {
                if (width >= 1024) {
                  if (item.name !== '스터디의 My 정보') {
                    return (
                      <SideMenuItem
                        key={item.to}
                        name={item.name}
                        to={item.to}
                      />
                    );
                  }
                } else {
                  return (
                    <SideMenuItem key={item.to} name={item.name} to={item.to} />
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
