'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideMenuItem({
  name,
  to,
}: {
  name: string;
  to: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === to || pathname.startsWith(to + '/');

  return (
    <>
      <Link
        href={to}
        className={`flex pt-4 pb-3 lg:py-0 h-full relative justify-between hover:opacity-70 transition-opacity ${
          isActive ? 'opacity-100 hover:opacity-100' : 'opacity-30'
        }`}
      >
        <span className='tm4 text-[14px]'>{name}</span>
        <ChevronRight className='w-[22px] h-[22px] lg:block hidden' />
        {isActive && (
          <span className='absolute left-0 bottom-0 w-full h-[3px] bg-main lg:hidden'></span>
        )}
      </Link>
    </>
  );
}
