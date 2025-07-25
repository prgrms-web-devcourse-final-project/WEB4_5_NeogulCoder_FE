import Image from 'next/image';
// import musicBunny from '@/assets/images/music-bunny.svg';
import { useEffect, useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { userPrStore } from '@/stores/prStore';

export default function FeedbackSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const { pr } = userPrStore();
  if (!pr) return null;

  return (
    <>
      <div className='w-1/2 h-[260px] border border-main/10 rounded-[10px] p-5 flex flex-col'>
        <div className='flex justify-between items-center'>
          <p className='tm3'>피드백</p>
          {pr.reviewContents.length > 0 && (
            <button
              type='button'
              className='text-text1/50 cursor-pointer t5'
              onClick={() => setIsModalOpen(true)}
            >
              더보기
            </button>
          )}
        </div>

        {pr.reviewContents.length === 0 ? (
          <div className='flex flex-1 justify-center items-center text-text1/50 t4'>
            받은 피드백이 없습니다
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-3'>
              <div className='w-[50px] h-[50px] bg-gray3 rounded-full overflow-hidden flex-shrink-0'>
                <Image
                  src={pr.reviewContents[0]?.reviewUserImgUrl}
                  alt='유저 프로필'
                  width={50}
                  height={50}
                />
              </div>

              <div className='flex flex-col justify-center'>
                <p className='tm4'>
                  {pr.reviewContents[0]?.reviewUserNickname}
                </p>
                <p className='t5 text-text1/50'>
                  {pr.reviewContents[0]?.reviewDate}
                </p>
              </div>
            </div>

            <p className='t4 text-text1 pl-[62px]'>
              {pr.reviewContents[0]?.reviewComment}
            </p>
          </div>
        )}

        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-main opacity-80' />
            <div className='relative z-10'>
              <FeedbackModal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
