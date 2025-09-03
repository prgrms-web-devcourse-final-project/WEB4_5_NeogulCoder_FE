'use client';

import Image from 'next/image';
import excellent from '@/assets/images/excellent.svg';
import good from '@/assets/images/good.svg';
import notGood from '@/assets/images/not-good.svg';
import { useEffect, useState } from 'react';
import MannerModal from './MannerModal';
import { PrData } from '@/types/pr';

export default function MannerSection({ pr }: { pr: PrData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  if (!pr) return null;

  const excellentCount =
    pr.reviewTypes?.find((tag) => tag.reviewType === 'EXCELLENT')
      ?.reviewCount ?? 0;
  const goodCount =
    pr.reviewTypes?.find((tag) => tag.reviewType === 'GOOD')?.reviewCount ?? 0;
  const BadCount =
    pr.reviewTypes?.find((tag) => tag.reviewType === 'BAD')?.reviewCount ?? 0;

  return (
    <div className='lg:h-[260px] lg:border lg:border-main/10 lg:rounded-[10px] flex flex-col p-5'>
      <div className='flex justify-between items-center lg:mb-[35px]'>
        <p className='tm3'>매너 평가</p>
        <button
          type='button'
          className='text-text1/30 cursor-pointer t5'
          onClick={() => setIsModalOpen(true)}
        >
          더보기
        </button>
      </div>
      <hr className='block lg:hidden w-full border-t border-gray-200 mt-2 mb-8' />

      <div className='flex justify-evenly'>
        <div className='flex flex-col gap-5 items-center'>
          <Image
            src={excellent}
            alt='최고예요'
            className='w-16 h-16 sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80Px]'
          />
          <p>
            <span className='tm2'>{excellentCount}</span>{' '}
            <span className='t4'>개</span>
          </p>
        </div>

        <div className='flex flex-col gap-5 items-center'>
          <Image
            src={good}
            alt='좋아요'
            className='w-16 h-16 sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80Px]'
          />
          <p>
            <span className='tm2'>{goodCount}</span>{' '}
            <span className='t4'>개</span>
          </p>
        </div>

        <div className='flex flex-col gap-5 items-center'>
          <Image
            src={notGood}
            alt='별로예요'
            className='w-16 h-16 sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80Px]'
          />
          <p>
            <span className='tm2'>{BadCount}</span>{' '}
            <span className='t4'>개</span>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-main opacity-80' />
          <div className='relative z-10 '>
            <MannerModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
