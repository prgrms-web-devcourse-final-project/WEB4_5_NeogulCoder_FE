'use client';

import Image from 'next/image';

export default function ChatItem({
  image,
  name,
  time,
  content,
}: {
  image: string;
  name: string;
  time: string;
  content: string;
}) {
  return (
    <>
      <div className='flex mb-7'>
        <div className='w-12 h-12 mr-3 overflow-hidden rounded-full border border-border1 mb-1 shrink-0'>
          <Image
            src={image}
            alt={`${name}의 프로필 사진`}
            width={48}
            height={0}
          />
        </div>
        <div className='pt-1.5'>
          <div className='flex items-end gap-2 mb-1'>
            <div className='tm3 leading-none'>{name}</div>
            <div className='tl6 leading-tight text-gray5'>{time}</div>
          </div>
          <div className='t4'>{content}</div>
        </div>
      </div>
    </>
  );
}
