'use client';
import { axiosInstance } from '@/lib/api/axios';
import { userAuthStore } from '@/stores/userStore';
import { BookCopy, LogOut } from 'lucide-react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserInfoModal({
  onItemClick,
}: {
  onItemClick: () => void;
}) {
  const router = useRouter();
  const me = userAuthStore((state) => state.user);
  // console.log(me);

  const handleGoToPr = () => {
    if (!me?.id) {
      return;
    }
    router.push(`/profile/pr/${me.id}`);
    onItemClick();
  };

  const handleMyPage = () => {
    router.push('/my/calendar');
    onItemClick();
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      onItemClick();
      userAuthStore.getState().clearUser();
      localStorage.removeItem('login_status');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  return (
    <div className='w-[160px] border border-main/10 bg-white rounded-md shadow-sm overflow-hidden tm5'>
      <button
        type='button'
        className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4'
        onClick={handleGoToPr}
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
        onClick={handleLogout}
      >
        <LogOut className='w-4 h-4 text-gray5' />
        로그아웃
      </button>
    </div>
  );
}
