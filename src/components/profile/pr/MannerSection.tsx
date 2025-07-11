'use client';
import Image from 'next/image';
import excellent from '@/assets/images/excellent.svg';
import good from '@/assets/images/good.svg';
import notGood from '@/assets/images/not-good.svg';
import { useState } from 'react';
import MannerModal from './MannerModal';

export default function MannerSection() {
  const [isOpen, setIsOpen] = useState(false);
  const count = 10;
  return (
    <>
      <div className="w-1/2 h-[260px] border border-main/10 rounded-[10px] flex flex-col p-5">
        <div className="flex justify-between items-center mb-[35px]">
          <p className="tm3">매너 평가</p>
          <button
            type="button"
            className="text-text1/30 cursor-pointer t4"
            onClick={() => setIsOpen(true)}
          >
            더보기
          </button>
        </div>

        <div className="flex justify-evenly">
          <div className="flex flex-col gap-5 items-center">
            <Image src={excellent} alt="최고예요" />
            <p>
              <span className="tm1">{count}</span> 명
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center">
            <Image src={good} alt="좋아요" />
            <p>
              <span className="tm1">{count}</span> 명
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center">
            <Image src={notGood} alt="별로예요" />
            <p>
              <span className="tm1">{count}</span> 명
            </p>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-main opacity-80" />

            <div className="relative z-10">
              <MannerModal onClose={() => setIsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
