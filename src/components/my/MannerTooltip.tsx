import Image from 'next/image';
import studyDefault from '@/assets/images/manner-default.svg';
import { BadgeAlert } from 'lucide-react';

export default function MannerTooltip() {
  return (
    <div className='w-[433px] px-[42px] py-[38px] bg-white border border-border1 rounded-[10px]'>
      <div className='tb3 text-text1'>매너 평가 작성 시 유의사항</div>
      <div className='mt-5 tm4 text-text1 '>
        매너 평가는 더 나은 협업을 위한 따뜻한 피드백 시간이에요. 평가보단
        서로를 발견하고 개선하여 성장을 위한 개선안으로 사용되길 바랍니다.
      </div>
      <div className='flex flex-col justify-between w-[335px] h-[168px] tm4 text-text1 mt-[26px] px-[18px] py-[18px] border border-border1 rounded-[6px]'>
        <div>
          함께한 팀원이 성장할 수 있도록, 따뜻하고 솔직한 마음을 담아
          작성해주세요.
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <BadgeAlert className='w-[18px] h-[18px] text-red' />
            <span>구체적인 사례가 있다면 더 좋아요!</span>
          </div>
          <div className='flex items-center gap-2'>
            <BadgeAlert className='w-[18px] h-[18px] text-red' />
            <span>비난보다는 제안하는 말투로 표현해주세요.</span>
          </div>
          <div className='flex items-center gap-2'>
            <BadgeAlert className='w-[18px] h-[18px] text-red' />
            <span>단점보다 장점도 꼭 함께 적어주세요!</span>
          </div>
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
