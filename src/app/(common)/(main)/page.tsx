'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/banner1.svg';
import MainStudyList from '@/components/main/MainStudyList';
import MainRecruitmentList from '@/components/main/MainRecruitmentList';

export default function Main() {
  return (
    <>
      <div>
        <Image src={banner1} alt='banner' className='w-full rounded-[10px]' />

        <div className='mt-[105px]'>
          <MainStudyList />
        </div>

        <div className='mt-[110px]'>
          <p className='text-[22px] font-bold'>모집 중인 스터디</p>
          <MainRecruitmentList />
        </div>
      </div>
    </>
  );
}
