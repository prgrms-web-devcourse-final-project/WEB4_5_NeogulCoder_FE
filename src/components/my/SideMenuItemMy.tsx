'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideMenuItemMy({
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
        className={`flex justify-between items-center box-border whitespace-nowrap ${
          isActive
            ? 'opacity-100 border-b-[3px] border-main lg:border-none'
            : 'opacity-30 hover:opacity-100'
        }`}
      >
        <span className={`${isActive ? 'tb5' : 'tm4'}`}>{name}</span>
        <ChevronRight className='w-[22px] h-[22px] max-[1024px]:hidden' />
      </Link>
    </>
  );
}
