'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import Link from 'next/link';
import { userAuthStore } from '@/stores/userStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <>
      <header className='py-4 border-b border-border1'>
        <div className='max-w-[1280px] px-4 mx-auto flex items-center justify-between'>
          <h1 className='flex items-start text-[24px] font-bold text-logo3 gap-1'>
            <Image
              src={logoWibby}
              alt='로고'
              className='w-[80px] h-9 cursor-pointer'
            />
            관리자
          </h1>
          <div className='flex items-center gap-25 tm2'>
            <Link href={'/manager'}>회원관리</Link>
            <Link href={'/manager/study'}>스터디관리</Link>
            <Link href={'/manager/recruitment'}>모집글관리</Link>
          </div>
          <div>
            {user && (
              <p className='t3'>
                <span className='font-bold mr-1'>{user.nickname}</span>님
              </p>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
