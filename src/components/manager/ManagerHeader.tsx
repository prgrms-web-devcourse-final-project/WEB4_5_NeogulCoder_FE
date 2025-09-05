'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import Link from 'next/link';
import { userAuthStore } from '@/stores/userStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import axiosInstance from '@/lib/api/axiosInstance';

export default function ManagerHeader() {
  const user = userAuthStore((state) => state.user);
  const router = useRouter();

  // 목록 가져오기
  useEffect(() => {
    if (!user) return;
    if (user.role !== 'ROLE_ADMIN') {
      router.push('/');
      return;
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      userAuthStore.getState().clearUser();
      localStorage.removeItem('login_status');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  return (
    <>
      <header className='fixed top-0 left-0 bg-white w-full py-2.5 lg:py-4 border-b border-border1 z-25'>
        <div className='max-w-[1280px] px-4 mx-auto flex items-center justify-between'>
          <h1 className='flex items-center lg:items-start text-[18px] lg:text-[22px] font-bold text-logo3 gap-2'>
            <Link href={'/'}>
              <Image
                src={logoWibby}
                alt='로고'
                className='w-[68px] lg:w-[80px] h-9 cursor-pointer'
              />
            </Link>
            관리자
          </h1>
          <div className='hidden lg:flex items-center gap-25 tm2'>
            <Link href={'/manager'}>회원관리</Link>
            <Link href={'/manager/study'}>스터디관리</Link>
            <Link href={'/manager/recruitment'}>모집글관리</Link>
          </div>
          <div>
            {user && (
              <div className='flex items-center gap-2 lg:gap-3'>
                <p className='t3 text-sm'>
                  <span className='font-bold mr-1'>{user.nickname}</span>님
                </p>
                <button className='flex items-center t5' onClick={handleLogout}>
                  <LogOut className='w-4 h-4 lg:w-5 lg:h-5' />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
