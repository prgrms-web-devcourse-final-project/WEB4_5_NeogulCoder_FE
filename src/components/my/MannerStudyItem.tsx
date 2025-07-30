'use client';

import Image from 'next/image';
// import mannerDefault from '@/assets/images/manner-default.svg';
import logoWibby from '@/assets/images/logo-wibby.svg';
import { useState } from 'react';

export default function MannerStudyItem({
  studyName,
  imageUrl,
  isActive,
  onClick,
}: {
  studyName: string;
  imageUrl: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className='relative'>
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`w-15 h-15 flex justify-center items-center cursor-pointer rounded-[20px] border border-border1 hover:shadow-[0_1px_4px_rgba(0,0,0,0.12)] overflow-hidden ${
          isActive && 'border-2 border-main'
        }`}
      >
        <div className='relative w-15 h-15'>
          <Image
            src={imageUrl ? imageUrl : logoWibby}
            alt='스터디 이미지'
            fill
          />
        </div>
      </div>
      {isHover && (
        <div className='absolute -top-3 right-4 translate-x-full -translate-y-1 px-3 py-1 tm5 text-text1 bg-white rounded-[6px] border border-border1 whitespace-nowrap pointer-events-none z-10'>
          <span>{studyName}</span>
        </div>
      )}
    </div>
  );
}
