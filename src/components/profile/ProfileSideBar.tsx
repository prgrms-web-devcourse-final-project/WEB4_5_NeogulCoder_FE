'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { userAuthStore } from '@/store/userStore';

export default function SideBar() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<'pr' | '회원 탈퇴'>('pr');
  const user = userAuthStore((state) => state.user);

  const handleEditProfile = () => {
    router.push('/profile/edit-profile');
  };

  const handleWithdrawal = () => {
    setSelectedMenu('회원 탈퇴');
    router.push('/profile/withdrawal');
  };

  const handlePr = () => {
    setSelectedMenu('pr');
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
              <span className='tm2 cursor-default'>{user?.nickname}</span>
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
          <div
            className={`flex justify-between items-center cursor-pointer ${
              selectedMenu === 'pr' ? 'opacity-100' : 'opacity-30'
            }`}
            onClick={handlePr}
          >
            <span>PR</span>
            <ChevronRight className='w-[22px] h-[22px]' />
          </div>

          <div
            className={`flex justify-between items-center cursor-pointer ${
              selectedMenu === '회원 탈퇴' ? 'opacity-100' : 'opacity-30'
            }`}
            onClick={handleWithdrawal}
          >
            <span>회원 탈퇴</span>
            <ChevronRight className='w-[22px] h-[22px]' />
          </div>
        </div>
      </div>
    </div>
  );
}
