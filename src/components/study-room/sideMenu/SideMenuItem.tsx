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
  const isActive = pathname === to;

  return (
    <>
      <Link
        href={to}
        className={`flex justify-between ${
          isActive ? 'opacity-100' : 'opacity-30'
        }`}
      >
        <span className='tm4'>{name}</span>
        <ChevronRight className='w-[22px] h-[22px]' />
      </Link>
    </>
  );
}
