import Image from 'next/image';
import studyDefault from '@/assets/images/manner-default.svg';
import studyDefaultMb from '@/assets/images/manner-default-mb.svg';
import { BadgeAlert } from 'lucide-react';

export default function MannerTooltip() {
  return (
    <div className='lg:w-[433px] min-[768px]:max-[1024px]:w-[300px] w-[275px] lg:px-[42px] lg:py-[38px] px-5 py-5 lg:bg-white bg-[#414141] border border-border1 rounded-[10px]'>
      <div className='lg:text-lg text-[14px] font-medium lg:text-text1 text-white'>
        매너 평가 작성 시 유의사항
      </div>
      <div className='lg:mt-5 mt-3 lg:text-sm text-[12px] font-normal lg:text-text1 text-white'>
        매너 평가는 더 나은 협업을 위한 따뜻한 피드백 시간이에요. 평가보단
        서로를 발견하고 개선하여 성장을 위한 개선안으로 사용되길 바랍니다.
      </div>
      <div className='flex flex-col justify-between gap-2 lg:w-[335px] lg:h-[168px] w-full lg:text-sm text-[11px] font-normal lg:text-text1 text-white lg:mt-[26px] mt-[18px] lg:px-[18px] lg:py-[18px] px-3 py-3 border lg:border-border1 border-white/80 rounded-[6px]'>
        <div>
          함께한 팀원이 성장할 수 있도록, 따뜻하고 솔직한 마음을 담아
          작성해주세요.
        </div>
        <div>
          <div className='flex items-center lg:gap-2 gap-1'>
            <BadgeAlert className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-red' />
            <span>구체적인 사례가 있다면 더 좋아요!</span>
          </div>
          <div className='flex items-center lg:gap-2 gap-1'>
            <BadgeAlert className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-red' />
            <span>비난보다는 제안하는 말투로 표현해주세요.</span>
          </div>
          <div className='flex items-center lg:gap-2 gap-1'>
            <BadgeAlert className='lg:w-[18px] lg:h-[18px] w-3.5 h-3.5 text-red' />
            <span>단점보다 장점도 꼭 함께 적어주세요!</span>
          </div>
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
