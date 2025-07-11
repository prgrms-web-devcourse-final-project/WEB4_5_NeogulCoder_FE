import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

export default function FeedbackSection() {
  const userName = '박스영';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-1/2 h-[260px] border border-main/10 rounded-[10px] p-5">
        <div className="flex justify-between items-center mb-10">
          <p className="tm3">피드백</p>
          <button
            type="button"
            className="text-text1/30 cursor-pointer t4"
            onClick={() => setIsOpen(true)}
          >
            더보기
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-[60px] h-[60px] bg-gray3 rounded-full overflow-hidden flex-shrink-0">
              <Image src={musicBunny} alt="예시 기본 프사" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="tm4">{userName}</p>
              <p className="t5 text-text1/50">2025.07.07</p>
            </div>
          </div>

          <p className="t4 text-text1 pl-[72px]">
            스터디 분위기메이커 스터디 분위기메이커 스터디 분위기메이커 스터디
            분위기메이커
          </p>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-main opacity-80" />

            <div className="relative z-10">
              <FeedbackModal onClose={() => setIsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
