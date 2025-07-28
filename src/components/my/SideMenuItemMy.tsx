'use client';

// import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ChevronRight = dynamic(
  () => import('lucide-react').then((m) => m.ChevronRight),
  { ssr: false }
);

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
        className={`flex justify-between items-center ${
          isActive ? 'opacity-100' : 'opacity-30'
        }`}
      >
        <span className='tm4'>{name}</span>
        <ChevronRight className='w-[22px] h-[22px]' />
      </Link>
    </>
  );
}
