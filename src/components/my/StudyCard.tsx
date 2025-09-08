'use client';

import Image from 'next/image';
// import studyDefault from '@/assets/images/study-default.svg';
import logoWibby from '@/assets/images/logo-wibby.svg';
// import sunBunny from '@/assets/images/sun-bunny.svg';
import { Calendar, Crown, UsersRound } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { MyStudyListType } from '@/types/my';
import { useRouter } from 'next/navigation';
import { categoryFormatting } from '@/utils/categoryFormatting';

const studyTypeMap: Record<string, '온라인' | '오프라인' | '온/오프라인'> = {
  ONLINE: '온라인',
  OFFLINE: '오프라인',
  HYBRID: '온/오프라인',
};

export default function StudyCard({
  studyId,
  name,
  leaderNickname,
  capacity,
  currentCount,
  startDate,
  imageUrl,
  introduction,
  category,
  studyType,
}: MyStudyListType['studies'][0]) {
  const router = useRouter();
  return (
    // min-[900px]:w-[274px] w-[230px]
    <div
      className='flex flex-col justify-center w-full min-[900px]:px-[30px] min-[900px]:py-[30px] px-6 py-6 bg-white border-2 border-border1 rounded-[20px] lg:rounded-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      onClick={() => router.push(`/study/${studyId}/dashboard`)}
    >
      <div className='min-[900px]:tm3 tm4 text-text1 truncate'>{name}</div>
      <div className='flex justify-between items-center min-[900px]:mt-5 mt-4'>
        <div className='flex flex-col min-[900px]:gap-[10px] gap-2'>
          <div className='flex gap-[10px] items-center'>
            <Crown className='min-[900px]:w-5 min-[900px]:h-5 w-4 h-4 text-[#FBE175]' />
            <span className='min-[900px]:t4 t5 text-text1 min-[470px]:max-[498px]:w-[70px] min-[724px]:max-[742px]:w-[70px] min-[768px]:max-[795px]:w-[70px] min-[1130px]:max-[1203px]:w-[70px] truncate'>
              {leaderNickname}
            </span>
          </div>
          <div className='flex gap-[10px] items-center'>
            <UsersRound className='min-[900px]:w-5 min-[900px]:h-5 w-4 h-4 text-[#FBE175]' />
            <span className='min-[900px]:t4 t5 text-text1 truncate'>
              {currentCount}/{capacity}
            </span>
          </div>
          <div className='flex gap-[10px] items-center'>
            <Calendar className='min-[900px]:w-5 min-[900px]:h-5 w-4 h-4 text-[#FBE175]' />
            <span className='min-[900px]:t4 t5 text-text1 truncate'>
              {/* className='flex flex-col justify-center w-full md:min-w-[220px] lg:w-[274px] px-3.5 py-5 lg:px-[30px] lg:py-[30px] bg-white border-2 border-border1 rounded-[20px] lg:rounded-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-md'
      onClick={() => router.push(`/study/${studyId}/dashboard`)}
    >
      <div className='tm3 text-text1 truncate'>{name}</div>
      <div className='flex justify-between mt-2 lg:mt-5'>
        <div className='flex flex-col gap-[6px] lg:gap-[10px]'>
          <div className='flex gap-[6px] lg:gap-[10px] items-center'>
            <Crown className='w-4 h-4 lg:w-5 lg:h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>{leaderNickname}</span>
          </div>
          <div className='flex gap-[6px] lg:gap-[10px] items-center'>
            <UsersRound className='w-4 h-4 lg:w-5 lg:h-5 text-[#FBE175]' />
            <span className='t4 text-text1'>
              {currentCount}/{capacity}
            </span>
          </div>
          <div className='flex gap-[6px] lg:gap-[10px] items-center'>
            <Calendar className='w-4 h-4 lg:w-5 lg:h-5 text-[#FBE175]' />
            <span className='t4 text-text1'> */}
              {formatDate(startDate, 'YYYY.MM.DD')}
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center min-[900px]:w-15 min-[900px]:h-15 w-13 h-13 bg-white border border-[#EBE9E9] rounded-[50%] overflow-hidden'>
          {/* <div className='flex justify-center items-center w-12 h-12 lg:w-15 lg:h-15 bg-white border border-[#EBE9E9] rounded-[50%] overflow-hidden'> */}
          <div className='relative w-full h-full'>
            <Image
              src={imageUrl ? imageUrl : logoWibby}
              alt='스터디 대표 이미지'
              priority
              fill
              className={
                imageUrl ? 'object-cover' : 'object-contain scale-[0.6]'
              }
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center px-3 min-[900px]:py-4 py-3 rounded-[6px] lg:rounded-[10px] bg-gray4 min-[900px]:mt-5 mt-4'>
        <span className='min-[900px]:t4 t5 text-text1 opacity-70 truncate'>
          {introduction ? introduction : '함께 좋은 결과 만들어봅시다!'}
        </span>
      </div>
      <div className='flex gap-2 min-[900px]:mt-6 mt-5'>
        {/* <div className='flex justify-center items-center px-2 lg:px-3 py-2 lg:py-4 rounded-[6px] lg:rounded-[10px] bg-gray4 mt-5'>
        <span className='t4 text-text1 opacity-70 truncate'>
          {introduction ? introduction : '함께 좋은 결과 만들어봅시다!'}
        </span>
      </div>
      <div className='flex gap-2 mt-4 lg:mt-6'> */}
        <div className='tag-type1'>
          <span className='min-[900px]:tb5 tb6'>
            {categoryFormatting(category)}
          </span>
        </div>
        <div className='tag-type1'>
          <span className='min-[900px]:tb5 tb6'>
            {/* {studyType === 'ONLINE' ? '온라인' : '오프라인'} */}
            {studyTypeMap[studyType]}
          </span>
        </div>
      </div>
    </div>
  );
}
