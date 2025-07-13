'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SideBar() {
  const userName = '박스영';
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/profile/edit-profile');
  };

  const handleWithdrawal = () => {
    router.push('/profile/withdrawal');
  };

  const handlePr = () => {
    router.push('/profile/pr');
  };

  const handleMyPage = () => {
    router.push('/my/calendar');
  };

  return (
    <div className='w-full flex justify-center text-text1'>
      <div className='w-full max-w-[1248px] flex flex-col'>
        <div className='w-[300px] h-[100px] bg-gray4 rounded-[10px] flex items-center'>
          <div className='flex items-center gap-[28px] pl-8'>
            <div className='w-[70px] h-[70px] bg-gray3 rounded-full'>
              <Image src={musicBunny} alt='예시 기본 프사' />
            </div>
            <div className='flex flex-col justify-center'>
              <span className='tm2 cursor-default'>{userName}</span>
              <button
                type='button'
                className='t5 opacity-50 mt-[5px]'
                onClick={handleEditProfile}
              >
                프로필 수정
              </button>
            </div>
          </div>
        </div>
        <div className='flex gap-5 mt-4'>
          <button
            type='button'
            className='w-full h-10 bg-gray4 rounded-[10px] tm4'
            onClick={handleMyPage}
          >
            개인 일정
          </button>
        </div>
        <div className='flex flex-col gap-[30px] tm4 mt-[35px]'>
          <div className='flex justify-between items-center' onClick={handlePr}>
            <button type='button'>PR</button>
            <ChevronRight className='w-[22px] h-[22px] opacity-30 cursor-pointer' />
          </div>
          <div
            className='flex justify-between items-center'
            onClick={handleWithdrawal}
          >
            <button type='button'>회원 탈퇴</button>
            <ChevronRight className='w-[22px] h-[22px] opacity-30 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
}
