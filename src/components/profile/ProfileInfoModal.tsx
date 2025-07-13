'use client';
import { BookCopy, LogOut } from 'lucide-react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserInfoModal() {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/profile/edit-profile');
  };

  const handleMyPage = () => {
    router.push('/my/calendar');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };
  return (
    <div className='w-[160px] border border-main/10 bg-white rounded-md shadow-sm overflow-hidden tm5'>
      <button
        type='button'
        className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4'
        onClick={handleEditProfile}
      >
        <User className='w-4 h-4 text-gray5' />
        프로필 설정
      </button>

      <div className='h-px bg-gray4' />

      <button
        type='button'
        className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4'
        onClick={handleMyPage}
      >
        <BookCopy className='w-4 h-4 text-gray5' />
        마이 페이지
      </button>

      <div className='h-px bg-gray4' />

      <button
        type='button'
        className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4'
        onClick={handleLogin}
      >
        <LogOut className='w-4 h-4 text-gray5' />
        로그아웃
      </button>
    </div>
  );
}
