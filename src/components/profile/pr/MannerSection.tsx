'use client';

import Image from 'next/image';
import excellent from '@/assets/images/excellent.svg';
import good from '@/assets/images/good.svg';
import notGood from '@/assets/images/not-good.svg';
import { useEffect, useState } from 'react';
import MannerModal from './MannerModal';
import { PrData } from '@/types/pr'; // pr 타입 불러오기

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
  const notGoodCount =
    pr.reviewTypes?.find((tag) => tag.reviewType === 'NOTGOOD')?.reviewCount ??
    0;

  return (
    <div className='w-1/2 h-[260px] border border-main/10 rounded-[10px] flex flex-col p-5'>
      <div className='flex justify-between items-center mb-[35px]'>
        <p className='tm3'>매너 평가</p>
        <button
          type='button'
          className='text-text1/30 cursor-pointer t5'
          onClick={() => setIsModalOpen(true)}
        >
          더보기
        </button>
      </div>

      <div className='flex justify-evenly'>
        <div className='flex flex-col gap-5 items-center'>
          <Image src={excellent} alt='최고예요' />
          <p>
            <span className='tm2'>{excellentCount}</span>{' '}
            <span className='t4'>명</span>
          </p>
        </div>

        <div className='flex flex-col gap-5 items-center'>
          <Image src={good} alt='좋아요' />
          <p>
            <span className='tm2'>{goodCount}</span>{' '}
            <span className='t4'>명</span>
          </p>
        </div>

        <div className='flex flex-col gap-5 items-center'>
          <Image src={notGood} alt='별로예요' />
          <p>
            <span className='tm2'>{notGoodCount}</span>{' '}
            <span className='t4'>명</span>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-main opacity-80' />
          <div className='relative z-10'>
            <MannerModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
