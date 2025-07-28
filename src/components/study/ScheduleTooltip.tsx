import Image from 'next/image';
import studyDefault from '@/assets/images/manner-default.svg';
// import { BadgeCheck } from 'lucide-react';
import dynamic from 'next/dynamic';

const BadgeCheck = dynamic(
  () => import('lucide-react').then((m) => m.BadgeCheck),
  { ssr: false }
);

export default function ScheduleTooltip() {
  return (
    <div className='w-[433px] px-[42px] py-[38px] bg-white border border-border1 rounded-[10px]'>
      <div className='tb3 text-text1'>모임 일정 조율이란?</div>
      <div className='mt-5 tm4 text-text1 '>
        모임 일정 조율은 스터디 모임의 일정을 원활하게 관리하기 위한 기능입니다.
      </div>
      <div className='flex flex-col gap-1 justify-center w-[335px] h-[128px] tm4 text-text1 mt-[26px] px-[13px] py-[18px] border border-border1 rounded-[6px]'>
        <div className='flex items-center gap-2'>
          <BadgeCheck className='w-[18px] h-[18px] text-red' />
          <span>스터디장이 7일 이내의 기간을 설정합니다.</span>
        </div>
        <div className='flex items-center gap-2'>
          <BadgeCheck className='w-[18px] h-[18px] text-red' />
          <span>스터디원들은 가능한 시간을 선택하고 제출합니다.</span>
        </div>
        <div className='flex items-center gap-2'>
          <BadgeCheck className='w-[18px] h-[18px] text-red' />
          <span>스터디원들이 제출한 시간은 색상으로 나타납니다.</span>
        </div>
        <div className='flex items-center gap-2'>
          <BadgeCheck className='w-[18px] h-[18px] text-red' />
          <span>가장 많이 선택된 시간이 진한 색상으로 표현됩니다.</span>
        </div>
      </div>
      <div className='flex items-center mt-[26px] tm3'>
        <div>서로의 진심이</div>
        <Image
          src={studyDefault}
          alt='Wibby 로고'
          className='w-16 h-[31px] ml-1'
        />
        <div>를 더 따뜻하게 만듭니다.</div>
      </div>
    </div>
  );
}
