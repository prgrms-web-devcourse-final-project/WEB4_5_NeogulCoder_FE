import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import dynamic from 'next/dynamic';

export default function HelpModal() {
  const BadgeAlert = dynamic(
    () => import('lucide-react').then((m) => m.BadgeAlert),
    { ssr: false }
  );

  return (
    <>
      <div className='w-[433px] h-[459px] border-[1px] border-[#B8B8B8] rounded-[10px] p-10'>
        <div className='mb-5'>
          <span className='text-[22px] font-bold'>
            피어리뷰 작성 시 유의사항
          </span>
        </div>
        <div className='mb-[30px]'>
          <span className='tm3'>
            피어리뷰는 더 나은 협업을 위한 따뜻한 피드백 시간이에요. 평가보단
            서소를 발견하고 개선하여 성장을 위한 개선안으로 사용되길 바랍니다.
          </span>
        </div>
        <div className='w-[331px] mx-auto border-[1px] rounded-md p-[10px] space-y-1 border-[#B8B8B8]'>
          <div className='mb-10'>
            <span className='tm3'>
              함께한 팀원이 성장할 수 있도록, 따뜻하고 솔직한 마음을 담아
              작성해주세요.
            </span>
          </div>
          <div className='flex'>
            <BadgeAlert color='#EA726F' className=' mr-2' />
            <span className='tm3'>구체적인 사례가 있다면 더 좋아요!</span>
          </div>
          <div className='flex'>
            <BadgeAlert color='#EA726F' className=' mr-2' />
            <span className='tm3'>
              비난보다는 제안하는 말투로 표현해 주세요!
            </span>
          </div>
          <div className='flex'>
            <BadgeAlert color='#EA726F' className=' mr-2' />
            <span className='tm3'>단점보다 장점도 꼭 함께 적어주세요!</span>
          </div>
        </div>
        <div className='mt-[30px]'>
          <span className='tm3 flex'>
            서로의 진심이
            <Image src={logoWibby} alt='로고' className='h-7' />를 더 따뜻하게
            만듭니다.
          </span>
        </div>
      </div>
    </>
  );
}
