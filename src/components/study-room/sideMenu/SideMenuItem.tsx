'use client';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SideMenuItem({
  name,
  url,
  active,
}: {
  name: string;
  url: string;
  active: boolean;
}) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push(url)}
        className={`flex justify-between ${
          active ? 'opacity-100' : 'opacity-30'
        }`}
      >
        <span className='tm3'>{name}</span>
        <ChevronRight className='w-[22px] h-[22px]' />
      </button>
    </>
  );
}
