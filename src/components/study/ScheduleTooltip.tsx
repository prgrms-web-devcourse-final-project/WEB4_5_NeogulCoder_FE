import Image from 'next/image';
import studyDefault from '@/assets/images/manner-default.svg';
import studyDefaultMb from '@/assets/images/manner-default-mb.svg';
import { BadgeCheck } from 'lucide-react';

export default function ScheduleTooltip() {
  return (
    // min-[768px]:max-[1024px]:w-[310px] w-[275px]
    <div className='lg:w-[433px] w-[310px] lg:px-[42px] lg:py-[38px] px-5 py-5 lg:bg-white bg-[#414141] border border-border1 rounded-[10px]'>
      <div className='lg:text-lg text-[14px] font-medium lg:text-text1 text-white'>
        모임 일정 조율이란?
      </div>
      <div className='lg:mt-5 mt-3 lg:text-sm text-[12px] font-normal lg:text-text1 text-white'>
        모임 일정 조율은 스터디 모임의 일정을 원활하게 관리하기 위한 기능입니다.
      </div>
      <div className='flex flex-col gap-1 justify-center lg:w-[335px] lg:h-[128px] w-full lg:text-sm text-[11px] font-normal lg:text-text1 text-white lg:mt-[26px] mt-[18px] lg:px-[13px] lg:py-[18px] px-3 py-3 border lg:border-border1 border-white/80 rounded-[6px]'>
        <div className='flex items-center lg:gap-2 gap-1'>
          <BadgeCheck className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-green' />
          <span>스터디장이 7일 이내의 기간을 설정합니다.</span>
        </div>
        <div className='flex items-center lg:gap-2 gap-1'>
          <BadgeCheck className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-green' />
          <span>스터디원들은 가능한 시간을 선택하고 제출합니다.</span>
        </div>
        <div className='flex items-center lg:gap-2 gap-1'>
          <BadgeCheck className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-green' />
          <span>스터디원들이 제출한 시간은 색상으로 나타납니다.</span>
        </div>
        <div className='flex items-center lg:gap-2 gap-1'>
          <BadgeCheck className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-green' />
          <span>가장 많이 선택된 시간이 진한 색상으로 표현됩니다.</span>
        </div>
      </div>
      <div className='flex items-center lg:mt-[26px] mt-[18px] lg:text-[16px] text-[11.5px] font-normal lg:text-text1 text-white'>
        <div>서로의 진심이</div>
        <Image
          src={studyDefault}
          alt='Wibby 로고'
          className='w-16 h-[31px] ml-1 max-[1024px]:hidden'
          priority
        />
        <Image
          src={studyDefaultMb}
          alt='Wibby 로고'
          className='w-12 h-4 ml-1 lg:hidden'
          priority
        />
        <div>를 더 따뜻하게 만듭니다.</div>
      </div>
    </div>
  );
}
