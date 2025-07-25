'use client';

import { useEffect } from 'react';
import { getUser } from '@/lib/api/user';
import { userAuthStore } from '@/stores/userStore';
import MainStudyList from '@/components/main/MainStudyList';
import MainRecruitmentList from '@/components/main/MainRecruitmentList';
import MainBanner from '@/components/main/MainBanner';

export default function Main() {
  const { user, setUser } = userAuthStore();

  useEffect(() => {
    if (!user) {
      getUser()
        .then((res) => {
          setUser(res.data.data);
          localStorage.setItem('login_status', 'Y');
        })
        .catch((error) => {
          localStorage.removeItem('login_status');
          console.error('사용자 정보 불러오기 실패: ', error);
        });
    }
  }, [user, setUser]);

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
          {/* <MainRecruitmentList /> */}
        </div>
      </div>
    </>
  );
}
