'use client';

import Image from 'next/image';
import studyDefault from '@/assets/images/study-default.svg';
import { Calendar, Crown, UsersRound } from 'lucide-react';
import { ApplicationList } from '@/types/my';
import { formatDate } from '@/utils/formatDate';

export default function ApplyingStudyCard({
  name,
  leaderNickname,
  capacity,
  currentCount,
  startDate,
  imageUrl,
  introduction,
  category,
  studyType,
  status,
  read,
}: ApplicationList['applications'][0]) {
  return (
    <div className='flex flex-col justify-center w-[274px] px-[30px] py-[30px] bg-white border-2 border-border1 rounded-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'>
      <div className='tm3 text-text1 truncate'>{name}</div>
      <div className='flex justify-between mt-5'>
        <div className='flex flex-col gap-[10px]'>
          <div className='flex gap-[10px]'>
            <Crown className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>{leaderNickname}</span>
          </div>
          <div className='flex gap-[10px]'>
            <UsersRound className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>
              {currentCount}/{capacity}
            </span>
          </div>
          <div className='flex gap-[10px]'>
            <Calendar className='w-5 h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>
              {formatDate(startDate, 'YYYY.MM.DD')}
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center w-15 h-15 bg-white border border-[#EBE9E9] rounded-[50%]'>
          <div className='relative w-[40px] h-[40px]'>
            <Image
              src={imageUrl ? imageUrl : studyDefault}
              alt='스터디 대표 이미지'
              fill
            />
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-2 mt-5'>
        <div className='tag-type1'>
          <span className='tb5'>{category}</span>
        </div>
        <div className='tag-type1'>
          <span className='tb5'>
            {studyType === 'ONLINE' ? '온라인' : '오프라인'}
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center px-3 py-4 rounded-[10px] bg-gray4 mt-[10px]'>
        <span className='t4 text-text1 opacity-70 truncate'>
          {introduction ? introduction : '함께 좋은 결과 만들어봅시다!'}
        </span>
      </div>
      <div className='flex justify-between items-center mt-[18px]'>
        <div className='tag-type5 px-3 py-[11px]'>
          {read ? '프로필 열람 완료' : '프로필 미열람'}
        </div>
        {status === 'PENDING' && (
          <div className='tag-type4 red py-3'>
            <span className='tb5'>미완료</span>
          </div>
        )}
        {status === 'ACCEPT' && (
          <div className='tag-type4 blue py-3'>
            <span className='tb5'>승인</span>
          </div>
        )}
        {status === 'DENY' && (
          <div className='tag-type4 py-3'>
            <span className='tb5'>거절</span>
          </div>
        )}
      </div>
    </div>
  );
}
