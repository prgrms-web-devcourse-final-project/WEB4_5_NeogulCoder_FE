'use client';

import Image from 'next/image';
import studyDefault from '@/assets/images/study-default.svg';
import { Calendar, Crown, UsersRound } from 'lucide-react';

export default function StudyCard(props: {
  studyName: string;
  studyLeader: string;
  currentMemberCount: number;
  totalMemberCount: number;
  startDate: string;
  studyImage?: string;
  studyIntro?: string;
  category: string;
  studyWay: string;
}) {
  const {
    studyName,
    studyLeader,
    currentMemberCount,
    totalMemberCount,
    startDate,
    studyImage,
    studyIntro,
    category,
    studyWay,
  } = props;

  return (
    <div className='flex flex-col justify-center w-[274px] px-[30px] py-[30px] bg-white border-2 border-border1 rounded-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'>
      <div className='tm3 text-text1 truncate'>{studyName}</div>
      <div className='flex justify-between mt-5'>
        <div className='flex flex-col gap-[10px]'>
          <div className='flex gap-[10px]'>
            <Crown className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>{studyLeader}</span>
          </div>
          <div className='flex gap-[10px]'>
            <UsersRound className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>
              {currentMemberCount}/{totalMemberCount}
            </span>
          </div>
          <div className='flex gap-[10px]'>
            <Calendar className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>{startDate}</span>
          </div>
        </div>
        <div className='flex justify-center w-15 h-15 bg-white border border-[#EBE9E9] rounded-[50%]'>
          <Image
            src={studyImage ? studyImage : studyDefault}
            alt='스터디 대표 이미지'
            priority
          />
        </div>
      </div>
      <div className='flex justify-center items-center px-3 py-4 rounded-[10px] bg-gray4 mt-5'>
        <span className='t4 text-text1 opacity-70 truncate'>
          {studyIntro ? studyIntro : '함께 좋은 결과 만들어봅시다!'}
        </span>
      </div>
      <div className='flex gap-2 mt-6'>
        <div className='tag-type1'>
          <span className='tb5'>{category}</span>
        </div>
        <div className='tag-type1'>
          <span className='tb5'>{studyWay}</span>
        </div>
      </div>
    </div>
  );
}
