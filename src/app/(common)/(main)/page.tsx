'use client';

import Image from 'next/image';
import banner1 from '@/assets/images/banner1.svg';
import MainStudyList from '@/components/main/MainStudyList';
import MainRecruitmentList from '@/components/main/MainRecruitmentList';
import { getRecruitments } from '@/lib/api/main/main';
import { useEffect } from 'react';

export default function Main() {
  // 스터디 fetch
  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const { data } = await getRecruitments();
        console.log(data);
      } catch (error) {
        console.error('모집글 목록을 불러오는데 실패했습니다.', error);
      } finally {
      }
    };

    fetchRecruitments();
  }, []);
  return (
    <>
      <div>
        <Image src={banner1} alt='banner' className='w-full rounded-[10px]' />

        <MainStudyList />

        <div id='recruit' className='pt-[120px]'>
          <p className='text-[22px] font-bold'>모집 중인 스터디</p>
          <MainRecruitmentList />
        </div>
      </div>
    </>
  );
}
