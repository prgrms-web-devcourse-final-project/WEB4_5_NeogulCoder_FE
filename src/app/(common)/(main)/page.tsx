'use client';

import { userAuthStore } from '@/stores/userStore';
import MainBanner from '@/components/main/MainBanner';
import MainStudyList from '@/components/main/MainStudyList';
import MainRecruitmentList from '@/components/main/MainRecruitmentList';
import { Suspense } from 'react';

export default function Main() {
  const user = userAuthStore((state) => state.user);

  if (user === undefined) return null;

  return (
    <>
      <div>
        <div className='main-banner'>
          <MainBanner />
        </div>
        <div className='main-studies'>
          <MainStudyList />
        </div>

        <div id='recruit' className='pt-[120px]'>
          <p className='text-[22px] font-bold'>모집 중인 스터디</p>
          <Suspense>
            <MainRecruitmentList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
