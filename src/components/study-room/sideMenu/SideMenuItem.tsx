'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function SideMenuItem({
  name,
  to,
}: {
  name: string;
  to: string;
}) {
  const ChevronRight = dynamic(
    () => import('lucide-react').then((m) => m.ChevronRight),
    {
      ssr: false,
    }
  );

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
