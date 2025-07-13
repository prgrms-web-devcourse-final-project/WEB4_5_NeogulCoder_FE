'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useRouter } from 'next/navigation';

export default function SubHeader() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/main');
  };
  return (
    <>
      <div className='w-full flex justify-center text-text1'>
        <div className='w-full max-w-[1280px] flex items-center justify-between mt-4 px-4'>
          <div className='flex gap-[50px] tm3'>
            <button type='button' onClick={handleHome}>
              홈
            </button>
            <button type='button'>모집</button>
            <button type='button'>스터디 생성</button>
          </div>

          <div className='flex gap-6 cursor-pointer'>
            <button
              type='button'
              className='w-8 h-8 rounded-[12px] bg-gray3 flex items-center justify-center 
             shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:drop-shadow'
            >
              <Image
                src={musicBunny}
                alt='임시 기본 프사'
                className='w-[38px] h-[38px]'
              />
            </button>

            <button
              type='button'
              className='w-8 h-8 rounded-[12px] bg-gray3 flex items-center justify-center 
             shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:drop-shadow'
            >
              <Image
                src={musicBunny}
                alt='임시 기본 프사'
                className='w-[38px] h-[38px]'
              />
            </button>
          </div>
        </div>
      </div>
      <hr className='mt-[10px] border-main/10' />
    </>
  );
}
