import { Columns3Cog, FileCog, UserRoundPen } from 'lucide-react';
import Link from 'next/link';

export default function ManagerMobileMenu() {
  return (
    <>
      <div className='fixed shadow-[0_-1px_12px_rgba(0,0,0,0.1)] flex justify-around items-center text-xs h-[60px] left-0 bottom-0 w-full bg-white lg:hidden'>
        <Link href={'/manager'} className='flex flex-col items-center gap-1'>
          <UserRoundPen className='w-4 h-4' />
          회원관리
        </Link>
        <Link
          href={'/manager/study'}
          className='flex flex-col items-center gap-1'
        >
          <Columns3Cog className='w-4 h-4' />
          스터디관리
        </Link>
        <Link
          href={'/manager/recruitment'}
          className='flex flex-col items-center gap-1'
        >
          <FileCog className='w-4 h-4' />
          모집글관리
        </Link>
      </div>
    </>
  );
}
