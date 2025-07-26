'use client';
import { useEffect } from 'react';
import { userAuthStore } from '@/stores/userStore';
import { getUser } from '@/lib/api/user';
import MainBanner from '@/components/main/MainBanner';
import MainStudyList from '@/components/main/MainStudyList';

export default function Main() {
  const user = userAuthStore((state) => state.user);
  const setUser = userAuthStore((state) => state.setUser);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login_status');
    if (!user && isLoggedIn) {
      getUser()
        .then((res) => {
          setUser(res.data.data);
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
