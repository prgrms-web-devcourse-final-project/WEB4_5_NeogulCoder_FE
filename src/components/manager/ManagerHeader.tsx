'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import Link from 'next/link';

export default function ManagerHeader() {
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
            <Link href={'/auth/login'} className='tm3'>
              로그인
            </Link>
            {/* <p className='t3'>
            <span className='font-bold mr-1'>관리자</span>님
          </p> */}
          </div>
        </div>
      </header>
    </>
  );
}
