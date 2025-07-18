'use client';
import { Crown } from 'lucide-react';
import Image from 'next/image';

export default function MemberCard({
  name,
  image,
  role,
}: {
  name: string;
  image: string;
  role: string;
}) {
  return (
    <>
      <div className='w-full flex items-center justify-between border border-border1 rounded-[10px] px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 overflow-hidden rounded-full border border-border1 shrink-0'>
            <Image
              src={image}
              width={40}
              height={0}
              alt={`${name} 프로필 이미지`}
            />
          </div>
          <div className='leading-none mt-1'>{name}</div>
        </div>
        {role === '팀장' ? (
          <div className=' flex items-center gap-2 t5 text-gray5'>
            나
            <Crown className='text-[#FBE175] w-5 h-5' />
          </div>
        ) : (
          <div className='flex gap-x-1.5 shrink-0'>
            <button className='inline-flex items-center justify-center t5 px-1.5 py-1 text-gray1 border border-gray1 rounded-md'>
              스터디장 위임
            </button>
            <button className='inline-flex items-center justify-center t5 px-1.5 py-1 text-red border border-red rounded-md'>
              강퇴
            </button>
          </div>
        )}
      </div>
    </>
  );
}
